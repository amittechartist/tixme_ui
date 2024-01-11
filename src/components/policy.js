import React from "react";
import Logo from "./assets/Logo.svg";
import Search from "./assets/search.png";
import Account from "./assets/account.svg";
import menu from "./assets/menu.svg";
import plus from "./assets/plus.svg";
import location from "./assets/location (5) 1.svg";
import Footer from './footer';
import HeaderMenu from './headermenu';
import MobileMenu from './mobilemenu';
const policy = () => {
  return (
    <>
      {/* <!-- mobile nav --> */}
      <HeaderMenu />
      <div class="mx-lg-4 my-lg-3 banner bg-primary-color rounded-8 position-relative">
        <MobileMenu />
        <h1 class="banner-h text-white text-uppercase fw-bold animate__animated animate__bounce">
          Privacy policy
        </h1>
      </div>
      <div
        class="banner-child mt-n200 bg-white p-md-5 p-4"
        style={{ overflowWrap: "break-word" }}
      >
        <p>
          This Privacy Policy describes Our policies and procedures on the
          collection, use and disclosure of Your information when You use the
          Service and tells You about Your privacy rights and how the law
          protects You.
        </p>
        <p>
          We use Your Personal data to provide and improve the Service. By using
          the Service, You agree to the collection and use of information in
          accordance with this Privacy Policy.
        </p>
        <p>Interpretation</p>
        <p>
          The words of which the initial letter is capitalized have meanings
          defined under the following conditions. The following definitions
          shall have the same meaning regardless of whether they appear in
          singular or in plural.
        </p>
        <p>Definitions</p>
        <p>For the purposes of this Privacy Policy:</p>
        <ul>
          <li>
            Account means a unique account created for You to access our Service
            or parts of our Service.
          </li>
          <li>
            Affiliate means an entity that controls, is controlled by or is
            under common control with a party, where "control" means ownership
            of 50% or more of the shares, equity interest or other securities
            entitled to vote for election of directors or other managing
            authority.
          </li>
          <li>
            Company (referred to as either "the Company", "We", "Us" or "Our" in
            this Agreement) refers to Evento.
          </li>
          <li>
            Cookies are small files that are placed on Your computer, mobile
            device or any other device by a website,{" "}
          </li>
          <li>
            Containing the details of Your browsing history on that website
            among its many uses.
          </li>
          <li>Country refers to: Alaska, United States</li>
          <li>
            Device means any device that can access the Service such as a
            computer, a cellphone or a digital tablet.
          </li>
          <li>
            Personal Data is any information that relates to an identified or
            identifiable individual. Service refers to the Website.
          </li>
          <li>
            Service Provider means any natural or legal person who processes the
            data on behalf of the Company. It refers to third-party companies or
            individuals employed by the Company to facilitate the Service, to
            provide the Service on behalf of the Company, to perform services
            related to the Service or to assist the Company in analyzing how the
            Service is used.
          </li>
          <li>
            Third-party Social Media Service refers to any website or any social
            network website through which a User can log in or create an account
            to use the Service.
          </li>
          <li>
            Usage Data refers to data collected automatically, either generated
            by the use of the Service or from the Service infrastructure itself
            (for example, the duration of a page visit).
          </li>
          <li>
            Website refers to Evento, accessible from
            https://codecanyon8.kreativdev.com/evento
          </li>
          <li>
            You means the individual accessing or using the Service, or the
            company, or other legal entity on behalf of which such individual is
            accessing or using the Service, as applicable.
          </li>
        </ul>
        <p>Collecting and Using Your Personal Data</p>
      </div>
      <Footer />
    </>
  );
};

export default policy;
