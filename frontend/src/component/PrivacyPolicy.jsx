import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container px-6 py-10 mx-auto max-w-5xl bg-white shadow-md rounded-lg">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-600">
        Privacy Policy
      </h1>
      <p className="text-lg leading-7 text-gray-700 mb-6">
        At <span className="font-semibold">PropertyMission24x7</span>, we are committed to
        protecting the privacy and confidentiality of our clients and visitors. This Privacy Policy
        explains how we collect, use, and protect your personal information when you engage with our
        services or visit our website.
      </p>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Information We Collect</h2>
        <p className="text-gray-700 leading-7 mb-4">
          We may collect the following types of personal information when you interact with our
          website or services:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            <strong>Contact Information:</strong> Name, email address, phone number, and physical
            address.
          </li>
          <li>
            <strong>Transaction Information:</strong> Details about property inquiries, purchases,
            sales, or rentals.
          </li>
          <li>
            <strong>Financial Information:</strong> Information necessary for facilitating loans or
            mutual fund services (e.g., income details, credit history).
          </li>
          <li>
            <strong>Website Usage Information:</strong> Data on how you use our website, such as IP
            address, browser type, and usage patterns.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. How We Use Your Information</h2>
        <p className="text-gray-700 leading-7 mb-4">The information we collect is used to:</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Provide and improve our real estate services.</li>
          <li>
            Facilitate transactions such as property sales, purchases, rentals, and financial
            services.
          </li>
          <li>Communicate with you regarding your inquiries, transactions, and other service-related matters.</li>
          <li>
            Send you relevant marketing information and property listings (you can opt-out of
            marketing communications at any time).
          </li>
          <li>
            Enhance your user experience on our website by understanding your preferences and browsing behavior.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
          3. Information Sharing and Disclosure
        </h2>
        <p className="text-gray-700 leading-7 mb-4">
          We do not share your personal information with third parties except in the following
          situations:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            <strong>Service Providers:</strong> We may share information with trusted service
            providers (e.g., financial institutions) to help facilitate loans or mutual fund
            services.
          </li>
          <li>
            <strong>Legal Obligations:</strong> We may disclose your information if required by law
            or to protect the rights, property, or safety of PropertyMission24x7, our clients, or
            others.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Data Security</h2>
        <p className="text-gray-700 leading-7 mb-6">
          We take appropriate measures to protect your personal information from unauthorized
          access, disclosure, or misuse. However, please note that no method of data transmission
          over the internet is 100% secure. While we strive to protect your personal information, we
          cannot guarantee its absolute security.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
          5. Cookies and Tracking Technologies
        </h2>
        <p className="text-gray-700 leading-7 mb-6">
          Our website may use cookies and similar tracking technologies to improve user experience,
          analyze site traffic, and personalize content. You can choose to disable cookies through
          your browser settings, but doing so may limit your access to certain features of our
          website.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">6. Your Rights</h2>
        <p className="text-gray-700 leading-7 mb-4">You have the following rights concerning your personal information:</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            <strong>Access and Correction:</strong> You can request access to or correction of your
            personal information.
          </li>
          <li>
            <strong>Deletion:</strong> You can request that we delete your personal information,
            subject to legal requirements or legitimate business purposes.
          </li>
          <li>
            <strong>Opt-Out:</strong> You can opt out of receiving marketing communications by
            following the unsubscribe instructions in our emails or by contacting us directly.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">7. Third-Party Links</h2>
        <p className="text-gray-700 leading-7 mb-6">
          Our website may contain links to third-party websites. This Privacy Policy does not apply
          to those websites, and we are not responsible for their privacy practices. We encourage
          you to read the privacy policies of any third-party websites you visit.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
          8. Changes to This Privacy Policy
        </h2>
        <p className="text-gray-700 leading-7 mb-6">
          We may update this Privacy Policy from time to time to reflect changes in our practices or
          legal requirements. Any changes will be posted on this page, and we encourage you to
          review it regularly.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">9. Contact Us</h2>
        <p className="text-gray-700 leading-7 mb-6">
          If you have any questions about this Privacy Policy or how we handle your personal
          information, please contact us at:
        </p>
        <ul className="text-gray-700 space-y-2">
          <li>
            <strong>Phone:</strong> +91 7015433569
          </li>
          <li>
            <strong>Email:</strong> Propertymission81@gmail.com
          </li>
          <li>
            <strong>Address:</strong> House No. 1450, Sector 15, Panchkula
          </li>
        </ul>
      </section>

      <p className="text-center mt-8 text-gray-600">
        By using our website and services, you agree to this Privacy Policy. Thank you for trusting{' '}
        <strong>PropertyMission24x7</strong> with your personal information.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
