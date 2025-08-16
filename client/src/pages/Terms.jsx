import React from 'react';
import { FaFileContract } from 'react-icons/fa';

const Section = ({ title, children }) => (
    <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
            {children}
        </div>
    </div>
);

const Terms = () => {
    return (
        <div className="bg-base-100">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <FaFileContract className="text-5xl text-primary mx-auto mb-4" />
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Terms and Conditions</h1>
                        <p className="text-lg text-gray-500 mt-2">Last Updated: August 16, 2025</p>
                    </div>

                    <div className="prose max-w-none">
                        <Section title="1. Introduction">
                            <p>
                                Welcome to Musafir Traveller ("we", "our", "us"). These Terms and Conditions govern your use of our website and services. By accessing or using our platform, you agree to be bound by these terms. If you do not agree with any part of the terms, you may not use our services.
                            </p>
                        </Section>

                        <Section title="2. User Accounts">
                            <p>
                                To access certain features, such as booking tours or posting stories, you must register for an account. You agree to provide accurate, current, and complete information during the registration process. You are responsible for safeguarding your password and for all activities that occur under your account.
                            </p>
                        </Section>

                        <Section title="3. Bookings and Payments">
                            <p>
                                All bookings are subject to availability. When you book a tour package, you agree to pay all charges associated with the booking. Payments are processed through our secure third-party payment provider, Stripe. Upon successful payment, your booking status will be updated to "In Review" and assigned to a tour guide.
                            </p>
                            <p>
                                Cancellation policies vary by package and will be detailed at the time of booking. Users may cancel bookings with a "Pending" status directly from their dashboard.
                            </p>
                        </Section>

                        <Section title="4. User Content (Stories)">
                            <p>
                                Our platform allows you to post, link, store, share, and otherwise make available certain information, text, graphics, or other material ("Content"). You are responsible for the Content that you post, including its legality, reliability, and appropriateness.
                            </p>
                            <p>
                                By posting Content, you grant us the right and license to use, modify, publicly display, and distribute such Content on and through the service. You retain any and all of your rights to any Content you submit.
                            </p>
                        </Section>

                        <Section title="5. Prohibited Activities">
                            <p>
                                You agree not to use the service for any unlawful purpose or to solicit others to perform or participate in any unlawful acts. You are prohibited from violating any international, federal, or state regulations, rules, laws, or local ordinances.
                            </p>
                        </Section>

                        <Section title="6. Limitation of Liability">
                            <p>
                                In no event shall Musafir Traveller, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
                            </p>
                        </Section>

                        <Section title="7. Changes to Terms">
                            <p>
                                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide at least 30 days' notice prior to any new terms taking effect. By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms.
                            </p>
                        </Section>

                        <Section title="8. Contact Us">
                            <p>
                                If you have any questions about these Terms, please contact us at support@musafirtraveller.com.
                            </p>
                        </Section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms;