import React from 'react';
import { FaCookieBite } from 'react-icons/fa';

// Helper component for consistent section styling
const Section = ({ title, children }) => (
    <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
            {children}
        </div>
    </div>
);

const Cookie = () => {
    return (
        <div className="bg-base-100">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <FaCookieBite className="text-5xl text-primary mx-auto mb-4" />
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Cookie Policy</h1>
                        <p className="text-lg text-gray-500 mt-2">Last Updated: August 16, 2025</p>
                    </div>

                    <div className="prose max-w-none">
                        <Section title="1. What Are Cookies?">
                            <p>
                                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
                            </p>
                        </Section>

                        <Section title="2. How We Use Cookies">
                            <p>
                                Musafir Traveller uses cookies to enhance your experience on our platform. We use them for the following purposes:
                            </p>
                            <ul>
                                <li>
                                    <strong>Authentication:</strong> We use cookies to recognize you when you are logged in to our site. This allows us to secure your account and keep you signed in as you navigate the platform.
                                </li>
                                <li>
                                    <strong>Preferences:</strong> We may use cookies to remember your settings and preferences, such as your preferred language or region.
                                </li>
                                <li>
                                    <strong>Analytics:</strong> We use cookies to help us understand how our service is being used, which helps us to improve the user experience.
                                </li>
                            </ul>
                        </Section>

                        <Section title="3. Types of Cookies We Use">
                            <p>
                                <strong>Essential Cookies:</strong> These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms.
                            </p>
                            <p>
                                <strong>Third-Party Cookies:</strong> We use services like Firebase for authentication and Stripe for payments, which may set their own cookies on your device. We do not control the use of these cookies and you should check the third-party websites for more information about their cookies.
                            </p>
                        </Section>

                        <Section title="4. Your Choices Regarding Cookies">
                            <p>
                                Most web browsers allow some control of most cookies through the browser settings. You can set your browser to block or alert you about these cookies, but some parts of the site will not then work. To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer">www.aboutcookies.org</a>.
                            </p>
                        </Section>

                        <Section title="5. Contact Us">
                            <p>
                                If you have any questions about our use of cookies, please contact us at support@musafirtraveller.com.
                            </p>
                        </Section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cookie;