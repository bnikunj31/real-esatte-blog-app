const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const Property = require("../models/Property");
const PropertyType = require("../models/PropertyTypes");
const mime = require("mime-types");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadFileToS3 = async (fileBuffer, fileName) => {
  const fileExtension = fileName.split(".").pop();
  const mimeType = mime.lookup(fileExtension);
  if (!mimeType) {
    throw new Error("Unable to determine MIME type");
  }
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${fileName}`,
    Body: fileBuffer,
    ContentType: mimeType,
    ACL: "public-read",
  };

  const command = new PutObjectCommand(params);
  const data = await s3.send(command);
  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${fileName}`;
};

const saveAndUploadFile = async (file) => {
  if (!file || !file.data || !file.name) {
    throw new Error("Invalid file or missing file details.");
  }

  const fileBuffer = file.data;
  const fileName = file.name;
  const s3Url = await uploadFileToS3(fileBuffer, fileName);
  return s3Url;
};

exports.addProperty = async (req, res) => {
  try {
    const { name, description, property_video, location, type, status } =
      req.body;
    const parsedRatings = JSON.parse(req.body.ratings || "[]");
    const parsedPriceAndArea = JSON.parse(req.body.PriceAndArea || "[]");
    const typeArray = type
      .split(",")
      .map((id) => new mongoose.Types.ObjectId(id.trim()));

    if (!name || !description || !location || !type || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.files) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const propertyImagesUrls = await Promise.all(
      (req.files.property_images
        ? Array.isArray(req.files.property_images)
          ? req.files.property_images
          : [req.files.property_images]
        : []
      ).map((file) => saveAndUploadFile(file))
    );

    const propertyMapUrls = await Promise.all(
      (req.files.property_map
        ? Array.isArray(req.files.property_map)
          ? req.files.property_map
          : [req.files.property_map]
        : []
      ).map((file) => saveAndUploadFile(file))
    );

    const propertyLocationMapUrls = await Promise.all(
      (req.files.property_location_map
        ? Array.isArray(req.files.property_location_map)
          ? req.files.property_location_map
          : [req.files.property_location_map]
        : []
      ).map((file) => saveAndUploadFile(file))
    );

    const property = new Property({
      name,
      description,
      rating: parsedRatings,
      property_images: propertyImagesUrls,
      property_map: propertyMapUrls,
      property_location_map: propertyLocationMapUrls,
      property_video,
      priceAndArea: parsedPriceAndArea,
      location,
      type: typeArray,
      status,
    });

    await property.save();
    return res.status(200).json({ msg: "Successfully Added The Property." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error.", err });
  }
};

//?                          DONE                          //

// ADD

exports.addCategory = async (req, res) => {
  try {
    const { category } = req.body;
    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }
    if (category.length < 3) {
      return res
        .status(400)
        .json({ message: "Category must be at least 3 characters" });
    }

    const propertyCategory = new PropertyType({
      type_name: category,
    });

    await propertyCategory.save();
    return res.status(200).json({ msg: "Successfully added a new category." });
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key error
      return res.status(400).json({ message: "Category already exists." });
    }
    console.error(err);
    res.status(500).json({ msg: "Internal Server Error." });
  }
};

// Update
exports.updateType = async (req, res) => {
  try {
    const { id } = req.params;
    const { type_name } = req.body;
    const propertyType = await PropertyType.findByIdAndUpdate(id, {
      type_name,
    });
    if (!propertyType) {
      return res.status(404).json({ msg: "No Category Found." });
    }
    return res.status(200).json({ msg: "Successfully Update Category." });
  } catch (err) {
    return res.status(500).json({ msg: "Internal Server Error." });
  }
};

// Delete
exports.deleteType = async (req, res) => {
  try {
    const { id } = req.params;
    const propertyType = await PropertyType.findByIdAndDelete(id);
    if (!propertyType) {
      return res.status(404).json({ msg: "User Not Found To Delete." });
    }
    return res.status(200).json({ msg: "Category Successfully Deleted." });
  } catch (err) {
    return res.status(500).json({ msg: "Internal Server Error." });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findByIdAndDelete(id);
    if (!property) {
      return res.status(404).json({ msg: "No Property found." });
    }
    return res.status(200).json({ msg: "Successfully Deleted Property." });
  } catch (err) {
    return res.status(500).json({ msg: "Internal Server Error." });
  }
};

// Fetch

exports.getPropertyType = async (req, res) => {
  try {
    const propertyTypes = await PropertyType.find().lean();
    if (propertyTypes.length === 0) {
      return res.status(400).json({ msg: "No Category found." });
    }
    return res.status(200).json({ propertyTypes });
  } catch (err) {
    console.error("Error fetching property types:", err);
    return res
      .status(500)
      .json({ msg: "Internal Server Error", error: err.message });
  }
};

exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find().lean();

    if (properties.length === 0) {
      return res.status(404).json({ msg: "No Properties Found." });
    }

    const typeIds = properties.flatMap((p) =>
      Array.isArray(p.type) ? p.type : [p.type]
    );

    const propertyTypes = await PropertyType.find({
      _id: { $in: typeIds },
    });

    const typeMapping = propertyTypes.reduce((acc, propertyType) => {
      acc[propertyType._id] = propertyType.type_name;
      return acc;
    }, {});

    properties.forEach((property) => {
      if (Array.isArray(property.type)) {
        property.type = property.type.map((typeId) => {
          return typeMapping[typeId]
            ? { id: typeId, name: typeMapping[typeId] }
            : null;
        });
      } else {
        property.type = typeMapping[property.type]
          ? { id: property.type, name: typeMapping[property.type] }
          : null;
      }
    });

    return res.status(200).json(properties);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

//?                          Pending                          //
exports.getCategorizeProperties = async (req, res) => {
  try {
    const { id } = req.params;
    const objectId = new mongoose.Types.ObjectId(id);
    if (!objectId) {
      return res.status(400).json({ message: "Something went wrong." });
    }
    const properties = await Property.find({ type: objectId }).lean();
    if (!properties) {
      return res.status(404).json({ message: "No Properties Found." });
    }
    return res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error " });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const { id } = req.params;

    let property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const {
      name,
      description,
      property_video,
      PriceAndArea,
      location,
      type,
      status,
      rating,
    } = req.body;
    const updatedRating = JSON.parse(rating);
    const parsedPriceAndArea = JSON.parse(PriceAndArea);
    const typeparse = JSON.parse(type);

    const propertyType = await PropertyType.find({
      _id: { $in: typeparse },
    }).lean();

    property.name = name || property.name;
    property.description = description || property.description;
    property.property_video = property_video || property.property_video;
    property.location = location || property.location;
    property.type = typeparse;
    property.status = status || property.status;
    property.rating = updatedRating || property.rating;
    property.priceAndArea = parsedPriceAndArea || property.priceAndArea;

    // Handle file uploads to S3
    if (req.files) {
      const { property_images, property_map, property_location_map } =
        req.files;

      const handleFileArray = async (fileArray) => {
        const uploadedFiles = [];
        if (fileArray.length) {
          for (let file of fileArray) {
            try {
              const fileUrl = await saveAndUploadFile(file);
              uploadedFiles.push(fileUrl);
            } catch (error) {
              console.error("Error uploading file to S3:", error);
            }
          }
        } else {
          try {
            const fileUrl = await saveAndUploadFile(fileArray);
            uploadedFiles.push(fileUrl);
          } catch (error) {
            console.error("Error uploading file to S3:", error);
          }
        }
        return uploadedFiles;
      };

      // Upload property images, maps, and location maps to S3
      if (property_images) {
        property.property_images = await handleFileArray(property_images);
      }
      if (property_map) {
        property.property_map = await handleFileArray(property_map);
      }
      if (property_location_map) {
        property.property_location_map = await handleFileArray(
          property_location_map
        );
      }
    }

    // Save the updated property
    await property.save();

    res.status(200).json({
      message: "Property updated successfully",
      property,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
