import React, { useState } from "react";
import {
    Bell,
    ShoppingCart,
    Search,
    MessageCircle,
    FileText,
    Video,
    ChevronDown,
    HelpCircle,
    Mail,
    Phone,
    Clock3,
    BookOpen,
    FileCode2,
    ShieldCheck,
    Users,
} from "lucide-react";

const supportCards = [
    {
        title: "Chat Support",
        description: "Chat with our support team in real-time for quick assistance.",
        button: "Whats App",
        icon: <MessageCircle size={26} />,
        iconBg: "bg-[#e8f3eb]",
        iconColor: "text-[#2d6a4f]",
        buttonClass: "bg-[#2d6a4f] hover:bg-[#245640] text-white",
    },
    {
        title: "Documentation",
        description: "Browse helpful guides and articles for managing your portal.",
        button: "View Docs",
        icon: <FileText size={26} />,
        iconBg: "bg-[#f4efe2]",
        iconColor: "text-[#8a6a1f]",
        buttonClass:
            "bg-[#eef5ef] hover:bg-[#e4eee6] text-[#234b36] border border-[#d7e3d9]",
    },
    {
        title: "Video Tutorials",
        description: "Watch simple step-by-step tutorials to learn portal features.",
        button: "Watch Videos",
        icon: <Video size={26} />,
        iconBg: "bg-[#edf7ef]",
        iconColor: "text-[#4d7c57]",
        buttonClass:
            "bg-[#eef5ef] hover:bg-[#e4eee6] text-[#234b36] border border-[#d7e3d9]",
    },
];

const faqSections = [
    {
        title: "Getting Started",
        items: [
            {
                question: "How do I get started with the portal?",
                answer:
                    "After registration and verification, you can access all features. Start by completing your profile, then add products to your catalogue, set up factories, and start receiving orders from JSGallor.",
            },
            {
                question: "How long does account verification take?",
                answer:
                    "Account verification typically takes 24-48 hours. You'll receive an email notification once your account is verified. During this time, you can still complete your profile and explore the portal.",
            },
        ],
    },
    {
        title: "Catalogue Management",
        items: [
            {
                question: "How do I add a new product to my catalogue?",
                answer:
                    "Navigate to Catalogue Management from the sidebar, click 'Add New Product', fill in all required details including name, category, price, and upload images. Click 'Save Product' to add it to your catalogue.",
            },
            {
                question: "Can I bulk upload products?",
                answer:
                    "Currently, we support individual product uploads. For bulk uploads, please contact our support team for assistance with spreadsheet templates and mass upload options.",
            },
            {
                question: "How do I update product stock levels?",
                answer:
                    "Go to Catalogue Management, find the product, click 'Edit', update the quantity field, and save changes. Stock levels are updated in real-time for JS Gallor buyers.",
            },
        ],
    },
    {
        title: "Orders & Payments",
        items: [
            {
                question: "How do I view and manage orders?",
                answer:
                    "All orders from JS Gallor appear in your Orders dashboard. You can view order details, update status (Processing, Shipped, Delivered), and track order history from this section.",
            },
            {
                question: "What are the payment terms?",
                answer:
                    "Payments are processed within 15 days of order delivery. You can view payment status and download invoices from the Orders section. For detailed payment schedules, refer to your vendor agreement.",
            },
            {
                question: "How do I handle order returns?",
                answer:
                    "Initiate return requests through the Orders section. Select the order, choose 'Return Request', specify reason, and submit. Our support team will guide you through the return process.",
            },
        ],
    },
    {
        title: "Factory & Locations",
        items: [
            {
                question: "How can I add multiple factories?",
                answer:
                    "Go to Factories / Locations, click 'Add New Factory', enter factory details including location, capacity, and manager information. You can add and manage multiple production facilities.",
            },
            {
                question: "Can I assign products to specific factories?",
                answer:
                    "Yes! When adding or editing products, you can specify the manufacturing location. This helps in inventory management and order fulfillment from specific factory locations.",
            },
        ],
    },
    {
        title: "Account & Profile",
        items: [
            {
                question: "How do I update my company information?",
                answer:
                    "Navigate to Profile from the sidebar. All your registration details are editable here. Click 'Edit Profile', make your changes, and save. Some changes may require re-verification.",
            },
            {
                question: "How do I change my password?",
                answer:
                    "Go to Profile, click on 'Security Settings' (available in edit mode), enter your current password and new password, then confirm. Passwords must be at least 6 characters.",
            },
        ],
    },
];

function FAQItem({ question, answer, isOpen, onClick }) {
    return (
        <div className="rounded-2xl border border-[#dbe6dc] bg-white shadow-sm overflow-hidden">
            <button
                type="button"
                onClick={onClick}
                className="flex w-full items-center gap-4 px-4 py-4 text-left sm:px-5 sm:py-5"
            >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f4efe2] text-[#8a6a1f]">
                    <HelpCircle size={18} />
                </div>

                <div className="flex-1">
                    <h4 className="text-base font-semibold text-[#234b36] sm:text-lg">
                        {question}
                    </h4>
                </div>

                <ChevronDown
                    size={20}
                    className={`shrink-0 text-[#5c8f6b] transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>

            <div
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
            >
                <div className="overflow-hidden">
                    <div className="border-t border-[#eef2ee] px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
                        <p className="text-sm leading-7 text-[#5f7467] sm:text-base">
                            {answer}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const HelpSupport = () => {
    const [openItems, setOpenItems] = useState({});

    const toggleItem = (key) => {
        setOpenItems((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <div className="min-h-screen bg-[#f7f4ea] text-[#264736]">
            <div className="mx-auto w-full max-w-400 px-4 py-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-[#234b36] sm:text-4xl">
                            Help & Support
                        </h1>
                        <p className="mt-2 text-sm text-[#5f7467] sm:text-base">
                            Find answers to common questions and get assistance when needed
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <button className="relative rounded-xl border border-[#d7e3d9] bg-white p-3 text-[#2d6a4f] shadow-sm transition hover:bg-[#eef5ef]">
                            <Bell size={20} />
                            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#5c8f6b] text-xs font-semibold text-white">
                                3
                            </span>
                        </button>

                        <button className="relative rounded-xl border border-[#d7e3d9] bg-white p-3 text-[#2d6a4f] shadow-sm transition hover:bg-[#eef5ef]">
                            <ShoppingCart size={20} />
                            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#d3b97a] text-xs font-semibold text-[#264736]">
                                5
                            </span>
                        </button>
                    </div>
                </div>

                {/* Hero */}
                <div className="mb-6 rounded-[28px] border border-[#dbe6dc] bg-white p-6 shadow-sm sm:p-8 lg:p-10">
                    <div className="mx-auto max-w-4xl text-center">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#e8f3eb] text-[#2d6a4f] shadow-sm">
                            <HelpCircle size={38} />
                        </div>

                        <h2 className="mt-6 text-3xl font-bold text-[#234b36] sm:text-4xl">
                            How can we help you today?
                        </h2>

                        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#5f7467] sm:text-lg">
                            Search for help topics, browse documentation, explore tutorials,
                            or contact our support team for assistance.
                        </p>

                        <div className="mx-auto mt-8 max-w-3xl">
                            <div className="flex items-center gap-3 rounded-2xl border border-[#d7e3d9] bg-[#f9fbf9] px-4 py-4 shadow-sm">
                                <Search size={20} className="shrink-0 text-[#6a8174]" />
                                <input
                                    type="text"
                                    placeholder="Search for help topics, questions, or guides..."
                                    className="w-full bg-transparent text-sm text-[#234b36] outline-none placeholder:text-[#8a9a90] sm:text-base"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Support Cards */}
                <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {supportCards.map((card, index) => (
                        <div
                            key={index}
                            className="rounded-3xl border border-[#dbe6dc] bg-white p-6 shadow-sm"
                        >
                            <div
                                className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ${card.iconBg} ${card.iconColor}`}
                            >
                                {card.icon}
                            </div>

                            <h3 className="text-2xl font-bold text-[#234b36]">
                                {card.title}
                            </h3>

                            <p className="mt-3 text-sm leading-7 text-[#5f7467] sm:text-base">
                                {card.description}
                            </p>

                            <button
                                className={`mt-6 w-full rounded-xl px-4 py-3 font-semibold transition ${card.buttonClass}`}
                            >
                                {card.button}
                            </button>
                        </div>
                    ))}
                </div>

                {/* FAQ Sections */}
                <div className="space-y-8">
                    {faqSections.map((section, sectionIndex) => (
                        <section key={section.title}>
                            <div className="mb-4 border-b border-[#d9e4db] pb-3">
                                <h3 className="text-2xl font-bold text-[#234b36] sm:text-3xl">
                                    {section.title}
                                </h3>
                            </div>

                            <div className="space-y-4">
                                {section.items.map((item, itemIndex) => {
                                    const key = `${sectionIndex}-${itemIndex}`;
                                    return (
                                        <FAQItem
                                            key={key}
                                            question={item.question}
                                            answer={item.answer}
                                            isOpen={!!openItems[key]}
                                            onClick={() => toggleItem(key)}
                                        />
                                    );
                                })}
                            </div>
                        </section>
                    ))}
                </div>

                {/* Contact Support */}
                <div className="mt-10 rounded-[28px] border border-[#dbe6dc] bg-white p-6 shadow-sm sm:p-8">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f3eb] text-[#2d6a4f]">
                            <Users size={22} />
                        </div>
                        <h3 className="text-2xl font-bold text-[#234b36] sm:text-3xl">
                            Contact Our Support Team
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                        <div className="rounded-2xl border border-[#e2ebe4] bg-[#f9fbf9] p-5">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8f3eb] text-[#2d6a4f]">
                                <Mail size={22} />
                            </div>
                            <h4 className="text-xl font-bold text-[#234b36]">Email Support</h4>
                            <p className="mt-1 text-[#5f7467]">support@jsgallor.com</p>
                            <p className="mt-4 text-sm leading-7 text-[#5f7467]">
                                For detailed queries and documentation-related support.
                            </p>
                            <button className="mt-5 rounded-xl border border-[#d7e3d9] bg-white px-5 py-3 font-semibold text-[#234b36] transition hover:bg-[#eef5ef]">
                                Send Email
                            </button>
                        </div>

                        <div className="rounded-2xl border border-[#e2ebe4] bg-[#f9fbf9] p-5">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf7ef] text-[#3e8b57]">
                                <Phone size={22} />
                            </div>
                            <h4 className="text-xl font-bold text-[#234b36]">Phone Support</h4>
                            <p className="mt-1 text-[#5f7467]">+91 1800 123 4567</p>
                            <p className="mt-4 text-sm leading-7 text-[#5f7467]">
                                Direct assistance for urgent issues and important queries.
                            </p>
                            <button className="mt-5 rounded-xl bg-[#2d6a4f] px-5 py-3 font-semibold text-white transition hover:bg-[#245640]">
                                Call Now
                            </button>
                        </div>

                        <div className="rounded-2xl border border-[#e2ebe4] bg-[#f9fbf9] p-5">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#f4efe2] text-[#8a6a1f]">
                                <Clock3 size={22} />
                            </div>
                            <h4 className="text-xl font-bold text-[#234b36]">Support Hours</h4>
                            <p className="mt-1 text-[#5f7467]">Mon - Sat, 9 AM - 6 PM IST</p>
                            <p className="mt-4 text-sm leading-7 text-[#5f7467]">
                                Response times may vary outside business hours for non-critical
                                requests.
                            </p>
                            <button className="mt-5 rounded-xl border border-[#d7c18b] bg-[#fbf5e4] px-5 py-3 font-semibold text-[#8a6a1f] transition hover:bg-[#f6efd9]">
                                Check Status
                            </button>
                        </div>
                    </div>

                    {/* Additional Resources */}
                    <div className="mt-8 border-t border-[#edf1ee] pt-6">
                        <h4 className="text-xl font-bold text-[#234b36]">
                            Additional Resources
                        </h4>

                        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                            {[
                                "Vendor Knowledge Base",
                                "API Documentation",
                                "Terms of Service",
                                "Privacy Policy",
                            ].map((item, index) => (
                                <button
                                    key={index}
                                    className="rounded-xl border border-[#d7e3d9] bg-[#f9fbf9] px-4 py-3 text-left font-semibold text-[#234b36] transition hover:bg-[#eef5ef]"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* System Status */}
                <div className="mt-8 rounded-3xl border border-[#dbe6dc] bg-white p-5 shadow-sm sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-3">
                            <span className="mt-2 h-3 w-3 shrink-0 rounded-full bg-green-500" />
                            <div>
                                <h4 className="text-xl font-bold text-[#234b36]">
                                    Support System Status
                                </h4>
                                <p className="mt-1 text-[#5f7467]">All systems operational</p>
                            </div>
                        </div>

                        <div className="text-sm text-[#5f7467] sm:text-base">
                            Last updated:{" "}
                            <span className="font-semibold text-[#2d6a4f]">Just now</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpSupport;