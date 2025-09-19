import React from 'react';

const About = () => {
    return (
        <div className="container mx-auto px-6 md:px-4 py-12 space-y-12">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 mt-14">About Get Me a Chai</h1>
            <p className="text-lg text-center text-gray-400 max-w-3xl mx-auto">
                Get Me a Chai is a crowdfunding platform designed for creators to fund their projects with the support of their fans.
                It&apos;s a space where your fans can directly contribute to your creative endeavors by buying you a chai.
                Unlock the potential of your fanbase and bring your projects to life.
            </p>

            <section className="space-y-8">
                <h2 className="text-3xl font-semibold text-center mb-6">How It Works</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="flex items-center gap-4 bg-white rounded-lg p-4 shadow hover:shadow-lg transition">
                        <img className="w-20 h-20 rounded-full object-cover" src="/group.gif" alt="Fans Want to Collaborate" />
                        <div>
                            <h3 className="text-xl font-semibold mb-1 text-black">Fans Want to Collaborate</h3>
                            <p className='text-gray-700'>Your fans are enthusiastic about collaborating with you on your projects.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 bg-white rounded-lg p-4 shadow hover:shadow-lg transition">
                        <img className="w-20 h-20 rounded-full object-cover" src="/coin.gif" alt="Support Through Chai" />
                        <div>
                            <h3 className="text-xl font-semibold mb-1 text-black">Support Through Chai</h3>
                            <p className='text-gray-700'>Receive support from your fans in the form of chai purchases, directly contributing to your project funding.</p>
                        </div>
                    </div>
                </div>
            </section>

            {[
                {
                    title: "Benefits for Creators",
                    items: [
                        "Direct financial support from your fanbase",
                        "Engage with your fans on a more personal level",
                        "Access to a platform tailored for creative projects",
                    ]
                },
                {
                    title: "Benefits for Fans",
                    items: [
                        "Directly contribute to the success of your favorite creators",
                        "Exclusive rewards and perks for supporting creators",
                        "Be part of the creative process and connect with creators",
                    ]
                },
                {
                    title: "Benefits of Collaboration",
                    items: [
                        "Unlock new opportunities through collaboration with fellow creators",
                        "Expand your network and reach a wider audience",
                        "Combine skills and resources to create innovative projects",
                    ]
                },
                {
                    title: "Community Engagement",
                    items: [
                        "Interact with a supportive community of like-minded individuals",
                        "Receive valuable feedback and encouragement from peers",
                        "Participate in discussions and events centered around your interests",
                    ]
                },
                {
                    title: "Access to Resources",
                    items: [
                        "Gain access to resources such as tutorials, templates, and tools",
                        "Receive guidance and mentorship from experienced creators",
                        "Stay updated on industry trends and best practices",
                    ]
                },
                {
                    title: "Recognition and Exposure",
                    items: [
                        "Showcase your work to a global audience and gain recognition",
                        "Feature in promotional materials and campaigns",
                        "Build your portfolio and increase your credibility as a creator",
                    ]
                },
                {
                    title: "Supportive Community",
                    items: [
                        "Join a community that values creativity, diversity, and inclusivity",
                        "Find encouragement and inspiration from fellow members",
                        "Collaborate on projects and share resources for mutual growth",
                    ]
                },
            ].map((section, idx) => (
                <section key={idx} className="space-y-4">
                    <h2 className="text-2xl md:text-3xl font-semibold">{section.title}</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-400">
                        {section.items.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                </section>
            ))}
        </div>
    );
}

export default About;

export const metadata = {
    title: "About - Get Me A Chai",
}
