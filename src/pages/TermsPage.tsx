import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function TermsPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1 py-16">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-8">Terms of Service</h1>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p>Last updated: {new Date().toLocaleDateString()}</p>

                        <h2>1. Agreement to Terms</h2>
                        <p>By accessing our website, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations.</p>

                        <h2>2. Intellectual Property</h2>
                        <p>The content, organization, graphics, design, compilation, and other matters related to the Site are protected under applicable copyrights and other proprietary (including but not limited to intellectual property) rights.</p>

                        <h2>3. Use License</h2>
                        <p>Permission is granted to temporarily download one copy of the materials (information or software) on Prometheus Tech's website for personal, non-commercial transitory viewing only.</p>

                        <h2>4. Disclaimer</h2>
                        <p>The materials on Prometheus Tech's website are provided on an 'as is' basis. Prometheus Tech makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

                        <h2>5. Limitations</h2>
                        <p>In no event shall Prometheus Tech or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Prometheus Tech's website.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
