import React from 'react';

const About = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-6 lg:px-16">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          About <span className="text-blue-500">PropertyMission24x7</span>
        </h2>

        {/* About Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* About Description */}
          <div className="text-gray-700 leading-relaxed">
            <p className="mb-4">
              Welcome to <span className="font-bold">PropertyMission24x7</span>, your trusted partner in real estate services across the Tricity region, including Panchkula, Zirakpur, Derabassi, Mohali, and Kharar. Whether you are looking to buy, sell, or rent properties, we are here to make your real estate journey smooth and successful.
            </p>
            <p className="mb-4">
              With years of experience in the real estate market, we specialize in helping you find your dream home or investment property while ensuring seamless property sales.
            </p>
            <p className="mb-4">
              At PropertyMission24x7, we are dedicated to connecting tenants with landlords for rental properties across both residential and commercial spaces.
            </p>
          </div>

          {/* Services List */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Our Expertise</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li className="mb-2">Sales & Purchase: Helping you find your dream home or investment property, while also ensuring seamless property sales.</li>
              <li className="mb-2">Rental Services: Connecting tenants with landlords for rental properties across residential and commercial spaces.</li>
              <li className="mb-2">Loans & Financial Services: Facilitating property loans with trusted financial institutions to support your homeownership or investment journey.</li>
              <li className="mb-2">Mutual Fund Advisory: Offering expert guidance on mutual fund investments to help you grow your wealth alongside your property portfolio.</li>
            </ul>
          </div>
        </div>

        {/* Coverage Section */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Our Coverage</h3>
          <ul className="list-disc pl-5 text-gray-700">
            <li className="mb-2">Panchkula</li>
            <li className="mb-2">Zirakpur</li>
            <li className="mb-2">Derabassi</li>
            <li className="mb-2">Mohali</li>
            <li className="mb-2">Kharar</li>
          </ul>
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Why Choose Us?</h3>
          <p className="text-gray-700 leading-relaxed">
            At <span className="font-bold">PropertyMission24x7</span>, we pride ourselves on delivering personalized and professional real estate services. Whether you are a first-time buyer, seasoned investor, or someone looking for rental solutions, we bring deep market knowledge and a client-first approach to every transaction.
          </p>
        </div>

        {/* Visit Us Section */}
        <div className="mt-12 text-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Visit Us</h3>
          <p className="mb-2">
            Our office is located at <span className="font-semibold">House No. 1450, Sector 15, Panchkula</span>. Drop by to discuss your property needs, or contact us anytime. We are available 24x7 to assist you in making informed real estate decisions.
          </p>
        </div>

        {/* Get in Touch Section */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Get in Touch</h3>
          <p className="text-gray-700">
            For any inquiries or assistance, feel free to reach out to us. Let us help you find your ideal property and guide you through every step of the process.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
