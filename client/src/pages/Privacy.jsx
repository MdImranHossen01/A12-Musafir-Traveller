import React from 'react';
import { FaShieldAlt } from 'react-icons/fa';

// A helper component to keep the section styling consistent
const Section = ({ title, children }) => (
    <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
            {children}
        </div>
    </div>
);

const Privacy = () => {
    return (
        <div className="bg-base-100">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <FaShieldAlt className="text-5xl text-primary mx-auto mb-4" />
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Privacy Policy</h1>
                        <p className="text-lg text-gray-500 mt-2">Last Updated: August 16, 2025</p>
                    </div>

                    <div className="prose max-w-none">
                        <Section title="1. Information We Collect">
                            <p>
                                We collect information that you provide directly to us when you create an account, book a tour, or post a story. This information may include:
                            </p>
                            <ul>
                                <li>**Personal Identification Information:** Name, email address, and profile picture.</li>
                                <li>**Booking Information:** Details of the tours you book, including selected guides and tour dates.</li>
                                <li>**User-Generated Content:** Stories, photos, and comments you post on our platform.</li>
                            </ul>
                        </Section>

                        <Section title="2. How We Use Your Information">
                            <p>
                                We use the information we collect to operate, maintain, and provide the features and functionality of the Musafir Traveller service. This includes:
                            </p>
                            <ul>
                                <li>To create and manage your account.</li>
                                <li>To process your bookings and payments.</li>
                                <li>To display your stories and content to the community.</li>
                                <li>To communicate with you, including sending service-related notices and promotional offers.</li>
                            </ul>
                        </Section>

                        <Section title="3. Sharing of Your Information">
                            <p>
                                We do not sell or rent your personal information to third parties. We may share your information in the following limited circumstances:
                            </p>
                            <ul>
                                <li>**With Tour Guides:** When you book a tour, we share your name with the selected tour guide to facilitate the tour.</li>
                                <li>**For Legal Reasons:** We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
                            </ul>
                        </Section>

                        <Section title="4. Data Security">
                            <p>
                                We use a combination of technical, administrative, and physical controls to maintain the security of your data. We use Firebase Authentication for secure account management and Stripe for encrypted payment processing. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee its absolute security.
                            </p>
                        </Section>

                        <Section title="5. Your Data Rights">
                            <p>
                                You have the right to access, update, or delete the information we have on you. You can manage your profile information from your dashboard. If you wish to delete your account permanently, please contact us.
                            </p>
                        </Section>

                        <Section title="6. Changes to This Privacy Policy">
                            <p>
                                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
                            </p>
                        </Section>

                        <Section title="7. Contact Us">
                            <p>
                                If you have any questions about this Privacy Policy, please contact us at privacy@musafirtraveller.com.
                            </p>
                        </Section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Privacy;