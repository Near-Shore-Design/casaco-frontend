import { useEffect, useState } from "react";

const PrivacyPolicy = () => {
  const [htmlString, setHtmlString] = useState("");

  useEffect(() => {
    const fetchHtmlFile = async () => {
      try {
        const response = await fetch("myHtml.html"); // Replace with the actual path to your HTML file
        const htmlContent = await response.text();
        setHtmlString(htmlContent);
      } catch (error) {
        console.error("Error fetching HTML file:", error);
      }
    };

    fetchHtmlFile();
  }, []);
  return (
    <div className="pt-28 px-10">
      <h1 className="text-2xl font-bold mb-3">PRIVACY POLICY</h1>
      <h3 className="mb-7">Last updated April 08, 2023</h3>
      <p className="text-lg py-2">
        This privacy notice for Casa Colombia Group (doing business as Casa
        Colombia) ("<b>Casa Colombia</b>," " <b>we</b>," " <b>us</b>," or "
        <b>our</b>"), describes how and why we might collect, store, use, and/or
        share ("<b>process</b>") your information when you use our services ("
        <b>Services</b>"), suchwe as when you:
      </p>
      <ul className="list-disc px-6">
        <li className="py-2.5 text-lg">
          Visit our website at{" "}
          <a href="http://www.casacolombia.co">http://www.casacolombia.co</a>,
          or any website of ours that links to this privacy notice
        </li>
        <li className="py-2.5 text-lg">
          Engage with us in other related ways, including any sales, marketing,
          or events
        </li>
      </ul>
      <p className="text-lg py-2">
        <b> Questions or concerns? </b> Reading this privacy notice will help
        you understand your privacy rights and choices. If you do not agree with
        our policies and practices, please do not use our Services. If you still
        have any questions or concerns, please contact us at
        info@casacolombia.co.
      </p>
      <h1>SUMMARY OF KEY POINTS</h1>
      <b>
        This summary provides key points from our privacy notice, but you can
        find out more details about any of these topics by clicking the link
        following each key point or by using our table of contents below to find
        the section you are looking for.
      </b>
      <p className="text-lg py-2">
        <b>What personal information do we process?</b> When you visit, use, or
        navigate our Services, we may process personal information depending on
        how you interact with Casa Colombia and the Services, the choices you
        make, and the products and features you use. Learn more about personal
        information you disclose to us.
      </p>
      <p className="text-lg py-2">
        <b>Do we process any sensitive personal information?</b> We do not
        process sensitive personal information.
      </p>
      <b> Do we receive any information from third parties? </b> We do not
      receive any information from third parties.
      <p className="text-lg py-2">
        <b>How do we process your information?</b> We process your information
        to provide, improve, and administer our Services, communicate with you,
        for security and fraud prevention, and to comply with law. We may also
        process your information for other purposes with your consent. We
        process your information only when we have a valid legal reason to do
        so. Learn more about how we process your information.
      </p>
      <p className="text-lg py-2">
        <b>
          In what situations and with which types of parties do we share
          personal information?
        </b>
        We may share information in specific situations and with specific
        categories of third parties. Learn more about when and with whom we
        share your personal information.
      </p>
      <p className="text-lg py-2">
        <b> How do we keep your information safe?</b> We have organizational and
        technical processes and procedures in place to protect your personal
        information. However, no electronic transmission over the internet or
        information storage technology can be guaranteed to be 100% secure, so
        we cannot promise or guarantee that hackers, cybercriminals, or other
        unauthorized third parties will not be able to defeat our security and
        improperly collect, access, steal, or modify your information. Learn
        more about how we keep your information safe.
      </p>
      <p className="text-lg py-2">
        <b> What are your rights?</b> Depending on where you are located
        geographically, the applicable privacy law may mean you have certain
        rights regarding your personal information. Learn more about your
        privacy rights.
      </p>
      <p className="text-lg py-2">
        <b> How do you exercise your rights?</b> The easiest way to exercise
        your rights is by submitting a data subject access request, or by
        contacting us. We will consider and act upon any request in accordance
        with applicable data protection laws.
      </p>
      <p className="text-lg py-2">
        Want to learn more about what Casa Colombia does with any information we
        collect? Review the privacy notice in full.
      </p>
      <div>
        <h2 className="text-2xl font-semibold py-6">TABLE OF CONTENTS</h2>
        <ul className="list-disc px-6">
          <li className="py-2.5 text-lg">
            <a href="">1. WHAT INFORMATION DO WE COLLECT?</a>
          </li>
          <li className="py-2.5 text-lg">
            <a href="">2. HOW DO WE PROCESS YOUR INFORMATION?</a>
          </li>
          <li className="py-2.5 text-lg">
            <a href="">
              3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
            </a>
          </li>
          <li className="py-2.5 text-lg">
            <a href="">4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</a>
          </li>
          <li className="py-2.5 text-lg">
            <a href="">5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</a>
          </li>
          <li className="py-2.5 text-lg">
            <a href="">6. HOW LONG DO WE KEEP YOUR INFORMATION?</a>
          </li>
          <li className="py-2.5 text-lg">
            <a href="">7. HOW DO WE KEEP YOUR INFORMATION SAFE?</a>
          </li>
          <li className="py-2.5 text-lg">
            <a href="">8. DO WE COLLECT INFORMATION FROM MINORS?</a>
          </li>
          <li className="py-2.5 text-lg">
            <a href="">9. WHAT ARE YOUR PRIVACY RIGHTS?</a>
          </li>
          <li className="py-2.5 text-lg">
            <a href="">10. CONTROLS FOR DO-NOT-TRACK FEATURES</a>
          </li>
          <li className="py-2.5 text-lg">
            <a href="">
              11. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
            </a>
          </li>
          <li className="py-2.5 text-lg">
            <a href="">12. DO WE MAKE UPDATES TO THIS NOTICE?</a>
          </li>
          <li className="py-2.5 text-lg">
            <a href="">13. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>
          </li>
          <li className="py-2.5 text-lg">
            <a href="">
              14. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
              YOU?
            </a>
          </li>
        </ul>
        <h2 className="text-2xl font-semibold py-6">
          1. WHAT INFORMATION DO WE COLLECT?
        </h2>
        <h3 className="font-semibold text-xl">
          Personal information you disclose to us
        </h3>
        <p className="text-lg py-2">
          In Short: We collect personal information that you provide to us.{" "}
          <br />
        </p>
        <p className="text-lg py-2">
          We collect personal information that you voluntarily provide to us
          when you register on the Services, express an interest in obtaining
          information about us or our products and Services, when you
          participate in activities on the Services, or otherwise when you
          contact us. <br />
          <br />
          Personal Information Provided by You. The personal information that we
          collect depends on the context of your interactions with us and the
          Services, the choices you make, and the products and features you use.
          The personal information we collect may include the following:
        </p>
        <ul className="list-disc px-6">
          <li className="py-2.5 text-lg">names</li>
          <li className="py-2.5 text-lg">phone number</li>
          <li className="py-2.5 text-lg">email addresses</li>
        </ul>
        <p className="text-lg py-2">
          Sensitive Information. We do not process sensitive information.
          Payment Data. We may collect data necessary to process your payment if
          you make purchases, such as your payment instrument number, and the
          security code associated with your payment instrument. All payment
          data is stored by __________. You may find their privacy notice
          link(s) here: __________.
          <br />
          Social Media Login Data. We may provide you with the option to
          register with us using your existing social media account details,
          like your Facebook, Twitter, or other social media account. If you
          choose to register in this way, we will collect the information
          described in the section called "HOW DO WE HANDLE YOUR SOCIAL LOGINS?"
          below.
          <br />
          All personal information that you provide to us must be true,
          complete, and accurate, and you must notify us of any changes to such
          personal information.
        </p>
        <h3>Information automatically collected</h3>
        <p className="text-lg py-2">
          <b> In Short</b>:{" "}
          <i>
            Some information — such as your Internet Protocol (IP) address
            and/or browser and device characteristics — is collected
            automatically when you visit our Services.
          </i>
        </p>
        <p className="text-lg py-2">
          We automatically collect certain information when you visit, use, or
          navigate the Services. This information does not reveal your specific
          identity (like your name or contact information) but may include
          device and usage information, such as your IP address, browser and
          device characteristics, operating system, language preferences,
          referring URLs, device name, country, location, information about how
          and when you use our Services, and other technical information. This
          information is primarily needed to maintain the security and operation
          of our Services, and for our internal analytics and reporting
          purposes.
          <br />
          Like many businesses, we also collect information through cookies and
          similar technologies.
        </p>
        <span>The information we collect includes:</span>
        <ul className="list-disc px-6">
          <li className="py-2.5 text-lg">
            Log and Usage Data. Log and usage data is service-related,
            diagnostic, usage, and performance information our servers
            automatically collect when you access or use our Services and which
            we record in log files. Depending on how you interact with us, this
            log data may include your IP address, device information, browser
            type, and settings and information about your activity in the
            Services (such as the date/time stamps associated with your usage,
            pages and files viewed, searches, and other actions you take such as
            which features you use), device event information (such as system
            activity, error reports (sometimes called "crash dumps"), and
            hardware settings).
          </li>
          <li className="py-2.5 text-lg">
            Device Data. We collect device data such as information about your
            computer, phone, tablet, or other device you use to access the
            Services. Depending on the device used, this device data may include
            information such as your IP address (or proxy server), device and
            application identification numbers, location, browser type, hardware
            model, Internet service provider and/or mobile carrier, operating
            system, and system configuration information.
          </li>
          <li className="py-2.5 text-lg">
            Location Data. We collect location data such as information about
            your device's location, which can be either precise or imprecise.
            How much information we collect depends on the type and settings of
            the device you use to access the Services. For example, we may use
            GPS and other technologies to collect geolocation data that tells us
            your current location (based on your IP address). You can opt out of
            allowing us to collect this information either by refusing access to
            the information or by disabling your Location setting on your
            device. However, if you choose to opt out, you may not be able to
            use certain aspects of the Services.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold py-6">
          2. HOW DO WE PROCESS YOUR INFORMATION?
        </h2>
        <p className="text-lg py-2">
          <b>In Short:</b>
          <i>
            We process your information to provide, improve, and administer our
            Services, communicate with you, for security and fraud prevention,
            and to comply with law. We may also process your information for
            other purposes with your consent.
          </i>{" "}
          <br />
          <br />
          <b>
            We process your personal information for a variety of reasons,
            depending on how you interact with our Services, including:
          </b>
        </p>
        <ul className="list-disc px-6">
          <li className="py-2.5 text-lg">
            <b>
              To facilitate account creation and authentication and otherwise
              manage user accounts.
            </b>
            We may process your information so you can create and log in to your
            account, as well as keep your account in working order.
          </li>
          <li className="py-2.5 text-lg">
            <b>To deliver and facilitate delivery of services to the user.</b>
            We may process your information to provide you with the requested
            service.
          </li>
          <li className="py-2.5 text-lg">
            <b>To deliver targeted advertising to you.</b> We may process your
            information to develop and display personalized content and
            advertising tailored to your interests, location, and more.
          </li>
          <li className="py-2.5 text-lg">
            <b>
              To evaluate and improve our Services, products, marketing, and
              your experience.
            </b>
            We may process your information when we believe it is necessary to
            identify usage trends, determine the effectiveness of our
            promotional campaigns, and to evaluate and improve our Services,
            products, marketing, and your experience.
          </li>
          <li className="py-2.5 text-lg">
            <b> To comply with our legal obligations. </b> We may process your
            information to comply with our legal obligations, respond to legal
            requests, and exercise, establish, or defend our legal rights.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold py-6">
          3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
        </h2>
        <p className="text-lg py-2">
          <b>In Short:</b> <br />
          <i>
            We may share information in specific situations described in this
            section and/or with the following categories of third parties.
          </i>
          <br />
          <b>
            {" "}
            Vendors, Consultants, and Other Third-Party Service Providers.
          </b>{" "}
          We may share your data with third-party vendors, service providers,
          contractors, or agents ("third parties") who perform services for us
          or on our behalf and require access to such information to do that
          work. We have contracts in place with our third parties, which are
          designed to help safeguard your personal information. This means that
          they cannot do anything with your personal information unless we have
          instructed them to do it. They will also not share your personal
          information with any organization apart from us. They also commit to
          protect the data they hold on our behalf and to retain it for the
          period we instruct. The categories of third parties we may share
          personal information with are as follows:
        </p>
        <ul className="list-disc px-6">
          <li className="py-2.5 text-lg">Ad Networks</li>
          <li className="py-2.5 text-lg">Cloud Computing Services</li>
          <li className="py-2.5 text-lg">Data Analytics Services</li>
          <li className="py-2.5 text-lg">Finance & Accounting Tools</li>
          <li className="py-2.5 text-lg">Payment Processors</li>
          <li className="py-2.5 text-lg">Performance Monitoring Tools</li>
          <li className="py-2.5 text-lg">Product Engineering & Design Tools</li>
          <li className="py-2.5 text-lg">Sales & Marketing Tools</li>
          <li className="py-2.5 text-lg">Social Networks</li>
          <li className="py-2.5 text-lg">
            User Account Registration & Authentication Services
          </li>
          <li className="py-2.5 text-lg">Website Hosting Service Providers</li>
        </ul>
        <p className="text-lg py-2">
          We also may need to share your personal information in the following
          situations:
        </p>
        <ul className="list-disc px-6">
          <li className="py-2.5 text-lg">
            Business Transfers. We may share or transfer your information in
            connection with, or during negotiations of, any merger, sale of
            company assets, financing, or acquisition of all or a portion of our
            business to another company.
          </li>
          <li className="py-2.5 text-lg">
            When we use Google Maps Platform APIs. We may share your information
            with certain Google Maps Platform APIs (e.g., Google Maps API,
            Places API). We obtain and store on your device ("cache") your
            location. You may revoke your consent anytime by contacting us at
            the contact details provided at the end of this document.
          </li>
          <li className="py-2.5 text-lg">
            Affiliates. We may share your information with our affiliates, in
            which case we will require those affiliates to honor this privacy
            notice. Affiliates include our parent company and any subsidiaries,
            joint venture partners, or other companies that we control or that
            are under common control with us.
          </li>
          <li className="py-2.5 text-lg">
            Business Partners. We may share your information with our business
            partners to offer you certain products, services, or promotions.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold py-6">
          4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
        </h2>
        <p className="text-lg py-2">
          <b> In Short: </b> We may use cookies and other tracking technologies{" "}
          <br />
          <br />
          to collect and store your information. <br /> We may use cookies and
          similar tracking technologies (like web beacons and pixels) to access
          or store information. Specific information about how we use such
          technologies and how you can refuse certain cookies is set out in our
          Cookie Notice.
        </p>
        <h2 className="text-2xl font-semibold py-6">
          5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
        </h2>
        <p className="text-lg py-2">
          <b>In Short:</b> If you choose to register or log in to our Services
          using a social media account, we may have access to certain
          information about you. <br />
          Our Services offer you the ability to register and log in using your
          third-party social media account details (like your Facebook or
          Twitter logins). Where you choose to do this, we will receive certain
          profile information about you from your social media provider. The
          profile information we receive may vary depending on the social media
          provider concerned, but will often include your name, email address,
          friends list, and profile picture, as well as other information you
          choose to make public on such a social media platform. <br />
          We will use the information we receive only for the purposes that are
          described in this privacy notice or that are otherwise made clear to
          you on the relevant Services. Please note that we do not control, and
          are not responsible for, other uses of your personal information by
          your third-party social media provider. We recommend that you review
          their privacy notice to understand how they collect, use, and share
          your personal information, and how you can set your privacy
          preferences on their sites and apps.
        </p>
        <h2 className="text-2xl font-semibold py-6">
          6. HOW LONG DO WE KEEP YOUR INFORMATION?
        </h2>
        <p className="text-lg py-2">
          {" "}
          <b>In Short: </b> We keep your information for as long as necessary to
          fulfill the purposes outlined in this privacy notice unless otherwise
          required by law. <br /> <br />
          We will only keep your personal information for as long as it is
          necessary for the purposes set out in this privacy notice, unless a
          longer retention period is required or permitted by law (such as tax,
          accounting, or other legal requirements). No purpose in this notice
          will require us keeping your personal information for longer than the
          period of time in which users have an account with us. <br />
          When we have no ongoing legitimate business need to process your
          personal information, we will either delete or anonymize such
          information, or, if this is not possible (for example, because your
          personal information has been stored in backup archives), then we will
          securely store your personal information and isolate it from any
          further processing until deletion is possible.
        </p>
        <h2 className="text-2xl font-semibold py-6">
          7. HOW DO WE KEEP YOUR INFORMATION SAFE?
        </h2>
        <b></b>
        <p className="text-lg py-2">
          {" "}
          <b>In Short: </b> We keep your information for as long as necessary to
          fulfill the purposes outlined in this privacy notice unless otherwise
          required by law. <br />
          <br />
          We will only keep your personal information for as long as it is
          necessary for the purposes set out in this privacy notice, unless a
          longer retention period is required or permitted by law (such as tax,
          accounting, or other legal requirements). No purpose in this notice
          will require us keeping your personal information for longer than the
          period of time in which users have an account with us. <br />
          When we have no ongoing legitimate business need to process your
          personal information, we will either delete or anonymize such
          information, or, if this is not possible (for example, because your
          personal information has been stored in backup archives), then we will
          securely store your personal information and isolate it from any
          further processing until deletion is possible.
        </p>
        <h2 className="text-2xl font-semibold py-6">
          8. DO WE COLLECT INFORMATION FROM MINORS?
        </h2>
        <b>In Short:</b> We do not knowingly collect data from or market to
        children under 18 years of age. <br /> <br />
        We do not knowingly solicit data from or market to children under 18
        years of age. By using the Services, you represent that you are at least
        18 or that you are the parent or guardian of such a minor and consent to
        such minor dependent’s use of the Services. If we learn that personal
        information from users less than 18 years of age has been collected, we
        will deactivate the account and take reasonable measures to promptly
        delete such data from our records. If you become aware of any data we
        may have collected from children under age 18, please contact us at
        __________. <br />
      </div>
      <h2 className="text-2xl font-semibold py-6">
        9. WHAT ARE YOUR PRIVACY RIGHTS?
      </h2>
      <b>In Short: </b> You may review, change, or terminate your account at any
      time. <br />
      <br />
      If you are located in the EEA or UK and you believe we are unlawfully
      processing your personal information, you also have the right to complain
      to your Member State data protection authority or UK data protection
      authority. <br /> <br />
      If you are located in Switzerland, you may contact the Federal Data
      Protection and Information Commissioner.
      <br /> <br />
      Withdrawing your consent: If we are relying on your consent to process
      your personal information, which may be express and/or implied consent
      depending on the applicable law, you have the right to withdraw your
      consent at any time. You can withdraw your consent at any time by
      contacting us by using the contact details provided in the section "HOW
      CAN YOU CONTACT US ABOUT THIS NOTICE?" below.
      <br />
      However, please note that this will not affect the lawfulness of the
      processing before its withdrawal nor, when applicable law allows, will it
      affect the processing of your personal information conducted in reliance
      on lawful processing grounds other than consent.
      <br /> <br />
      <li className="underline font-semibold">
        Opting out of marketing and promotional communications:
      </li>
      <p className="text-lg py-2">
        You can unsubscribe from our marketing and promotional communications at
        any time by clicking on the unsubscribe link in the emails that we send,
        or by contacting us using the details provided in the section "HOW CAN
        YOU CONTACT US ABOUT THIS NOTICE?" below. You will then be removed from
        the marketing lists. However, we may still communicate with you — for
        example, to send you service-related messages that are necessary for the
        administration and use of your account, to respond to service requests,
        or for other non-marketing purposes.
      </p>
      <h3>Account information</h3>
      <p className="text-lg py-2">
        If you would at any time like to review or change the information in
        your account or terminate your account, you can:
      </p>
      <ul className="list-disc px-5">
        <li className="py-2.5 text-lg">
          Log in to your account settings and update your user account.
        </li>
      </ul>
      <p className="text-lg py-2">
        Upon your request to terminate your account, we will deactivate or
        delete your account and information from our active databases. However,
        we may retain some information in our files to prevent fraud,
        troubleshoot problems, assist with any investigations, enforce our legal
        terms and/or comply with applicable legal requirements.
        <br /> <br />
        If you have questions or comments about your privacy rights, you may
        email us at privacy@casacolombia.co.
      </p>
      <h2 className="text-2xl font-semibold py-6">
        10. CONTROLS FOR DO-NOT-TRACK FEATURES
      </h2>
      <p className="text-lg py-2">
        Most web browsers and some mobile operating systems and mobile
        applications include a Do-Not-Track ("DNT") feature or setting you can
        activate to signal your privacy preference not to have data about your
        online browsing activities monitored and collected. At this stage no
        uniform technology standard for recognizing and implementing DNT signals
        has been finalized. As such, we do not currently respond to DNT browser
        signals or any other mechanism that automatically communicates your
        choice not to be tracked online. If a standard for online tracking is
        adopted that we must follow in the future, we will inform you about that
        practice in a revised version of this privacy notice.
      </p>
      <h2 className="text-2xl font-semibold py-6">
        11. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
      </h2>
      <p className="text-lg py-2">
        <b>In Short:</b> Yes, if you are a resident of California, you are
        granted specific rights regarding access to your personal information.{" "}
        <br /> <br />
        California Civil Code Section 1798.83, also known as the "Shine The
        Light" law, permits our users who are California residents to request
        and obtain from us, once a year and free of charge, information about
        categories of personal information (if any) we disclosed to third
        parties for direct marketing purposes and the names and addresses of all
        third parties with which we shared personal information in the
        immediately preceding calendar year. If you are a California resident
        and would like to make such a request, please submit your request in
        writing to us using the contact information provided below. <br />{" "}
        <br />
        If you are under 18 years of age, reside in California, and have a
        registered account with Services, you have the right to request removal
        of unwanted data that you publicly post on the Services. To request
        removal of such data, please contact us using the contact information
        provided below and include the email address associated with your
        account and a statement that you reside in California. We will make sure
        the data is not publicly displayed on the Services, but please be aware
        that the data may not be completely or comprehensively removed from all
        our systems (e.g., backups, etc.).
      </p>
      <h2 className="text-2xl font-semibold py-6">
        12. DO WE MAKE UPDATES TO THIS NOTICE?
      </h2>
      <p className="text-lg py-2">
        <b>In Short: </b> Yes, we will update this notice as necessary to stay
        compliant with relevant laws. <br /> <br />
        We may update this privacy notice from time to time. The updated version
        will be indicated by an updated "Revised" date and the updated version
        will be effective as soon as it is accessible. If we make material
        changes to this privacy notice, we may notify you either by prominently
        posting a notice of such changes or by directly sending you a
        notification. We encourage you to review this privacy notice frequently
        to be informed of how we are protecting your information.
      </p>
      <h2 className="text-2xl font-semibold py-6">
        13. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
      </h2>
      <p className="text-lg py-2">
        If you have questions or comments about this notice, you may email us at
        __________ or by post to: <br /> <br /> Casa Colombia Group __________
        __________
      </p>
      <h2 className="text-2xl font-semibold py-6">
        14. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
      </h2>
      <p className="text-lg py-2">
        Based on the applicable laws of your country, you may have the right to
        request access to the personal information we collect from you, change
        that information, or delete it. To request to review, update, or delete
        your personal information, please fill out and submit a{" "}
        <a href="#" className="text-blue-500 underline">
          data subject access request
        </a>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
