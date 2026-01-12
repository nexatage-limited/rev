"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LandingPage() {
  const [deviceModel, setDeviceModel] = useState("");
  const router = useRouter();

  const handleGetEstimate = () => {
    if (deviceModel.trim()) {
      router.push(`/user-app/auth/signup?device=${encodeURIComponent(deviceModel)}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="relative pt-20 pb-24 lg:pt-32 lg:pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 w-fit shadow-sm">
                <div className="flex h-2 w-2 rounded-full bg-primary animate-pulse shadow-sm"></div>
                <span className="text-sm font-bold text-accent uppercase tracking-wide">Trust-First Repairs</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[0.9] tracking-tight">
                Mobile Repair, <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-orange-500 to-red-500">
                  Redefined by AI.
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                Instantly connect with vetted technicians near you. We combine smart diagnostics with human expertise for seamless repairs.
              </p>

              <div className="mt-6 bg-white p-3 rounded-2xl shadow-2xl border border-gray-200 flex flex-col sm:flex-row gap-3 max-w-2xl">
                <div className="flex-1 flex items-center px-4 gap-3">
                  <div className="w-6 h-6 text-gray-400">
                    <span className="material-symbols-outlined">smartphone</span>
                  </div>
                  <input
                    className="w-full bg-transparent border-none focus:ring-0 text-gray-900 placeholder-gray-500 text-base font-medium h-12 outline-none"
                    placeholder="Enter your device model (e.g. iPhone 15 Pro)"
                    type="text"
                    value={deviceModel}
                    onChange={(e) => setDeviceModel(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleGetEstimate()}
                  />
                </div>
                <button 
                  onClick={handleGetEstimate}
                  className="bg-gradient-to-r from-accent to-orange-600 hover:from-accent/90 hover:to-orange-600/90 text-white px-8 py-4 rounded-xl font-bold text-base whitespace-nowrap flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Get Instant Quote
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
              </div>

              <div className="flex items-center gap-8 text-base font-semibold text-gray-600 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-green-600 text-[16px]">check</span>
                  </div>
                  <span>15k+ Happy Customers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-yellow-600 text-[16px]">star</span>
                  </div>
                  <span>4.9/5 Average Rating</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                <div className="relative h-full flex flex-col items-center justify-center text-white p-8">
                  <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                    <span className="material-symbols-outlined text-5xl">build</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-center">Professional Repair Service</h3>
                  <p className="text-gray-300 text-center leading-relaxed">Expert technicians at your doorstep with genuine parts and lifetime warranty</p>
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span>Available 24/7</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-yellow-400 text-[16px]">star</span>
                      <span>4.9 Rating</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl"></div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-black text-gray-900 mb-6">Why Choose Rev?</h2>
            <p className="text-xl text-gray-600 leading-relaxed">We combine advanced AI diagnostics with human expertise to create a seamless repair experience that puts trust first.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: "smart_toy", 
                title: "AI-Powered Diagnostics", 
                desc: "Our intelligent system identifies your issue instantly and matches you with the perfect expert for your specific device model and problem.",
                color: "from-blue-500 to-primary",
                bgColor: "bg-blue-50"
              },
              { 
                icon: "verified_user", 
                title: "Vetted Experts Only", 
                desc: "Trust is paramount. Every technician is background-checked, skill-verified, and continuously rated by customers like you.",
                color: "from-green-500 to-emerald-600",
                bgColor: "bg-green-50"
              },
              { 
                icon: "payments", 
                title: "Transparent Pricing", 
                desc: "Know exactly what you&apos;ll pay before you book. No hidden fees, no surprise charges, no last-minute upcharges. Just honest, fair rates.",
                color: "from-accent to-orange-600",
                bgColor: "bg-orange-50"
              }
            ].map((feature, i) => (
              <div key={i} className="group bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 hover:border-gray-200">
                <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`w-8 h-8 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center`}>
                    <span className="material-symbols-outlined text-white text-[20px]">{feature.icon}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent"></div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-gray-900 mb-6">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Get your device fixed in three simple steps. Fast, reliable, and completely transparent.</p>
          </div>
          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-primary -translate-x-1/2 rounded-full"></div>
            <div className="space-y-16">
              {[
                { 
                  icon: "calendar_add_on", 
                  title: "Book Your Repair", 
                  desc: "Enter your device details and describe the issue. Our AI analyzes the problem and gives you an instant, accurate quote with no surprises.",
                  color: "from-primary to-blue-600"
                },
                { 
                  icon: "handshake", 
                  title: "Meet Your Expert", 
                  desc: "We match you with a verified technician in your area. Track their real-time location and get updates every step of the way.",
                  color: "from-accent to-orange-600"
                },
                { 
                  icon: "check", 
                  title: "Device Fixed", 
                  desc: "Your expert repairs your device on-site with genuine parts. Payment is only released after you&apos;re completely satisfied with the work.",
                  color: "from-accent to-orange-600"
                }
              ].map((step, i) => (
                <div key={i} className="relative flex flex-col md:flex-row items-center justify-between group">
                  {/* Left content for items 0 and 2, right content for item 1 */}
                  {i !== 1 && (
                    <div className="md:w-[45%] mb-6 md:mb-0 md:text-right md:pr-16 pl-20 md:pl-0 text-left w-full order-2 md:order-1">
                      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Center icon */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-white border-4 border-white shadow-xl flex items-center justify-center z-10 order-1 md:order-2 group-hover:scale-110 transition-transform duration-300">
                    <div className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center`}>
                      <span className="material-symbols-outlined text-white text-[24px]">{step.icon}</span>
                    </div>
                  </div>
                  
                  {/* Right content for item 1 only */}
                  {i === 1 && (
                    <div className="md:w-[45%] mb-6 md:mb-0 md:text-left md:pl-16 pl-20 md:pl-0 text-left w-full order-2 md:order-3">
                      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Spacer for proper layout */}
                  {i !== 1 && <div className="md:w-[45%] order-3 hidden md:block"></div>}
                  {i === 1 && <div className="md:w-[45%] order-1 hidden md:block"></div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="technicians" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <div>
                <h2 className="text-4xl font-black text-gray-900 mb-6 leading-tight">
                  Repairs you can trust, <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">by people you can know.</span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">We don&apos;t send strangers to your door. We send verified professionals with proven skills, clean backgrounds, and stellar community reviews.</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { icon: "verified", title: "Identity Verified", desc: "Government ID checked" },
                  { icon: "psychology", title: "Skill Tested", desc: "Hands-on certification" },
                  { icon: "security", title: "Background Checked", desc: "Clean criminal record" }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-4">
                      <span className="material-symbols-outlined text-white text-[20px]">{item.icon}</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
              
              <button className="group flex items-center gap-3 text-primary font-bold text-lg hover:gap-4 transition-all duration-200">
                Meet our technicians
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </div>
              </button>
            </div>
            
            <div className="flex-1 w-full max-w-lg">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 transform hover:scale-105 transition-transform duration-300">
                <div className="h-40 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                  <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>
                </div>
                
                <div className="px-8 pb-8 relative">
                  <div className="flex justify-between items-end -mt-16 mb-6">
                    <div className="w-32 h-32 rounded-3xl border-4 border-white overflow-hidden shadow-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <span className="text-white text-5xl font-black">SJ</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 px-4 py-2 rounded-full text-sm font-bold border border-green-200 shadow-sm">
                      <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                      Available Now
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-2xl font-black text-gray-900 mb-2">Sarah Jenkins</h3>
                    <p className="text-gray-600 font-medium">Master Technician • 4 years experience</p>
                  </div>
                  
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="material-symbols-outlined text-yellow-500 text-[16px]">star</span>
                        ))}
                      </div>
                      <span className="font-bold text-gray-900">4.9</span>
                      <span className="text-gray-500 text-sm">(324 reviews)</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mb-6">
                    {["Screen Repair", "Battery", "Water Damage"].map((skill, i) => (
                      <span key={i} className="text-xs bg-gradient-to-r from-primary/10 to-accent/10 text-gray-700 font-medium px-3 py-1.5 rounded-full border border-gray-200">{skill}</span>
                    ))}
                  </div>
                  
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-2xl border border-gray-100 mb-6">
                    <p className="text-gray-700 italic text-center leading-relaxed">
                      &ldquo;Sarah was incredible! Fixed my iPhone screen perfectly in just 20 minutes at my office. Super professional and friendly.&rdquo;
                    </p>
                    <div className="flex justify-center mt-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="material-symbols-outlined text-yellow-500 text-[12px]">star</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full py-4 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white font-bold rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    Book Sarah Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-whitesmoke">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-gray-900 mb-6">Trusted by Thousands</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Real stories from real customers who got their devices fixed quickly, safely, and affordably</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                name: "Mike Chen", 
                device: "iPhone 15 Pro", 
                rating: 5, 
                comment: "Absolutely incredible service! My cracked screen was fixed in just 30 minutes. The technician was professional, friendly, and the pricing was completely fair. Highly recommend!",
                avatar: "MC",
                color: "from-blue-500 to-primary"
              },
              { 
                name: "Sarah Wilson", 
                device: "Samsung Galaxy S24", 
                rating: 5, 
                comment: "Battery replacement was quick and seamless. The technician explained everything clearly and even gave me tips to extend battery life. Outstanding experience!",
                avatar: "SW",
                color: "from-purple-500 to-pink-500"
              },
              { 
                name: "David Rodriguez", 
                device: "iPad Pro 12.9", 
                rating: 5, 
                comment: "Water damage repair that saved my device and all my work files. The communication throughout the entire process was excellent. These guys are lifesavers!",
                avatar: "DR",
                color: "from-green-500 to-emerald-600"
              }
            ].map((review, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-2 mb-6">
                  {[...Array(review.rating)].map((_, j) => (
                    <span key={j} className="material-symbols-outlined text-yellow-500 text-[18px]">star</span>
                  ))}
                  <span className="ml-2 text-sm font-bold text-gray-600">Verified Purchase</span>
                </div>
                
                <blockquote className="text-gray-700 mb-8 leading-relaxed text-lg italic">
                  &ldquo;{review.comment}&rdquo;
                </blockquote>
                
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${review.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{review.name}</p>
                    <p className="text-gray-600">{review.device} repair</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-8 bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-4 rounded-2xl border border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-black text-gray-900">15,000+</div>
                <div className="text-sm text-gray-600 font-medium">Happy Customers</div>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-3xl font-black text-gray-900 flex items-center gap-1">
                  4.9
                  <span className="material-symbols-outlined text-yellow-500 text-[24px]">star</span>
                </div>
                <div className="text-sm text-gray-600 font-medium">Average Rating</div>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-3xl font-black text-gray-900">98%</div>
                <div className="text-sm text-gray-600 font-medium">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50/30"></div>
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-12">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
              Don&apos;t let a broken phone
              <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-accent">slow you down.</span>
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join over 15,000 happy customers who got their devices fixed quickly, safely, and affordably with Rev. Your device. Your schedule. Your peace of mind.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <button 
              onClick={() => router.push('/user-app/auth/signup')}
              className="group w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-accent to-orange-600 hover:from-accent/90 hover:to-orange-600/90 text-white font-bold rounded-2xl shadow-2xl text-lg transition-all duration-200 transform hover:-translate-y-1 hover:shadow-3xl"
            >
              <span className="flex items-center justify-center gap-3">
                Book a Repair Now
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </span>
            </button>
            <button 
              onClick={() => router.push('/user-app/auth/signup?role=technician')}
              className="group w-full sm:w-auto px-10 py-5 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-2xl shadow-lg transition-all duration-200 transform hover:-translate-y-1"
            >
              <span className="flex items-center justify-center gap-3">
                Become a Technician
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">person_add</span>
              </span>
            </button>
          </div>
          
          <div className="flex items-center justify-center gap-8 text-gray-600">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-green-500">check_circle</span>
              <span className="font-medium">No upfront payment</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-500">schedule</span>
              <span className="font-medium">Same-day service</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-yellow-500">workspace_premium</span>
              <span className="font-medium">Lifetime warranty</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}