import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, Users, Video, Star } from "lucide-react";
import { useState } from "react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/60 via-pink-50/40 to-blue-100/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-white/60" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="flex justify-between items-center p-6">
          <div className=""></div>
          <div className="flex gap-3">
            <Button
              asChild
              variant="ghost"
              className="text-gray-700 hover:bg-gray-100"
            >
              <Link to="/auth/login">Log in</Link>
            </Button>
            <Button
              asChild
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Link to="/auth/signup">Sign up</Link>
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-4xl space-y-8">
            <div className="space-y-6">
              <h1 className="text-6xl md:text-7xl font-bold leading-tight text-gray-900">
                Create. <span className="text-purple-600">Share.</span> Inspire.
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Join millions of creators on the ultimate video platform where
                your content comes to life
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg"
              >
                <Link href="/signup" className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Start Creating
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 text-lg bg-white"
              >
                <Link href="/login">Watch Now</Link>
              </Button>
            </div>
          </div>
        </main>

        {/* Features Section */}
        <section className="pb-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4 p-6 rounded-lg bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Premium Quality
                </h3>
                <p className="text-gray-600">
                  Experience videos in stunning 4K quality with crystal clear
                  audio
                </p>
              </div>

              <div className="text-center space-y-4 p-6 rounded-lg bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg">
                <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Global Community
                </h3>
                <p className="text-gray-600">
                  Connect with creators and viewers from around the world
                </p>
              </div>

              <div className="text-center space-y-4 p-6 rounded-lg bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Creator Tools
                </h3>
                <p className="text-gray-600">
                  Advanced analytics and monetization tools for content creators
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
