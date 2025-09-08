import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Archive, Download, Github, Mail, Linkedin, MessageCircle, Users, Bug, Lightbulb } from "lucide-react"
import Link from "next/link"
import {Navbar} from "@/components/Navbar";
import {Footer} from "@/components/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">

      <Navbar />

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-6 bg-accent/10 text-accent border-accent/20">
              <MessageCircle className="w-3 h-3 mr-1"/>
              Get in Touch
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 text-balance">Contact Us</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Have questions, feedback, or need support? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardHeader className="text-center">
                <Mail className="w-12 h-12 text-accent mx-auto mb-4" />
                <CardTitle>Email Support</CardTitle>
                <CardDescription>Send me an email for general inquiries, support requests, or feedback</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground" asChild>
                  <a href="mailto:yassinekhemiri.dev@gmail.com">
                    <Mail className="w-5 h-5 mr-2" />
                    yassinekhemiri.dev@gmail.com
                  </a>
                </Button>
                <p className="text-sm text-muted-foreground mt-4">I'll try to response as fast as i can</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardHeader className="text-center">
                <Linkedin className="w-12 h-12 text-accent mx-auto mb-4" />
                <CardTitle>Professional Network</CardTitle>
                <CardDescription>Connect with me on LinkedIn for updates or professional inquiries</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button size="lg" variant="outline" asChild>
                  <a href="https://www.linkedin.com/in/yassine-khemiri-a4ba44222/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-5 h-5 mr-2" />
                    Follow on LinkedIn
                  </a>
                </Button>
                <p className="text-sm text-muted-foreground mt-4">Stay updated on Converti and my latest projects</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">How Can We Help?</h2>
            <p className="text-muted-foreground">Choose the best way to reach us based on your needs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Bug className="w-10 h-10 text-accent mb-4" />
                <CardTitle>Bug Reports</CardTitle>
                <CardDescription>
                  Found a bug or experiencing issues? Report it on GitHub for the fastest resolution.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <a href="https://github.com/YassineKh2/converti/issues" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    Report on GitHub
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Lightbulb className="w-10 h-10 text-accent mb-4" />
                <CardTitle>Feature Requests</CardTitle>
                <CardDescription>
                  Have an idea for a new feature? Share it with the community on GitHub Discussions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <a
                    href="https://github.com/YassineKh2/converti/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Start Discussion
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="w-10 h-10 text-accent mb-4" />
                <CardTitle>General Support</CardTitle>
                <CardDescription>
                  Need help using Converti or have general questions? Email us directly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <a href="yassinekhemiri.dev@gmail.com">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Support
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Github className="w-16 h-16 text-accent mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-primary mb-6">Join Our Community</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Converti is open source and community-driven. Contribute code, report issues, or help other users.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button size="lg" variant="outline" className="px-8 bg-transparent" asChild>
              <a href="https://github.com/YassineKh2/converti" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2" />
                View Source Code
              </a>
            </Button>
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8">
              <Download className="w-5 h-5 mr-2" />
              Download Converti
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
            <div className="flex items-center justify-center">
              <Github className="w-4 h-4 mr-2 text-accent" />
              Open Source Project
            </div>
            <div className="flex items-center justify-center">
              <Users className="w-4 h-4 mr-2 text-accent" />
              Community Driven
            </div>
            <div className="flex items-center justify-center">
              <MessageCircle className="w-4 h-4 mr-2 text-accent" />
              Active Support
            </div>
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  )
}
