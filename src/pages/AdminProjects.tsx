import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { Session } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/lib/supabaseClient";
import { useProjects, PROJECTS_QUERY_KEY, type Project } from "@/hooks/use-projects";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type LoginFormValues = {
  email: string;
  password: string;
};

type ProjectFormValues = {
  title: string;
  category: string;
  description: string;
  techCsv: string;
  imageUrl: string;
  liveUrl: string;
  sortOrder: number;
  isFeatured: boolean;
};

const AdminProjectsPage = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: projects = [], isLoading: isLoadingProjects } = useProjects();

  // Check existing session on mount
  useEffect(() => {
    let isMounted = true;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!isMounted) return;
        setSession(data.session ?? null);
      })
      .finally(() => {
        if (isMounted) setIsCheckingSession(false);
      });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const loginForm = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const projectForm = useForm<ProjectFormValues>({
    defaultValues: {
      title: "",
      category: "",
      description: "",
      techCsv: "",
      imageUrl: "",
      liveUrl: "",
      sortOrder: 0,
      isFeatured: true,
    },
  });

  const handleLoginSubmit = async (values: LoginFormValues) => {
    setIsLoggingIn(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Logged in",
        description: "You are now signed in as admin.",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    toast({
      title: "Logged out",
      description: "You have been signed out.",
    });
  };

  const handleProjectSubmit = async (values: ProjectFormValues) => {
    const tech = values.techCsv
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const { error } = await supabase.from("projects").insert({
      title: values.title,
      category: values.category,
      description: values.description,
      tech,
      image_url: values.imageUrl,
      live_url: values.liveUrl || null,
      sort_order: values.sortOrder ?? 0,
      is_featured: values.isFeatured,
    });

    if (error) {
      toast({
        title: "Failed to create project",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Project created",
      description: "The project has been added to your portfolio.",
    });

    projectForm.reset({
      title: "",
      category: "",
      description: "",
      techCsv: "",
      imageUrl: "",
      liveUrl: "",
      sortOrder: 0,
      isFeatured: true,
    });

    // Refresh projects
    queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
  };

  const handleDeleteProject = async (project: Project) => {
    const confirmed = window.confirm(`Delete project "${project.title}"? This cannot be undone.`);
    if (!confirmed) return;

    const { error } = await supabase.from("projects").delete().eq("id", project.id);

    if (error) {
      toast({
        title: "Failed to delete project",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Project deleted",
      description: `"${project.title}" has been removed.`,
    });

    queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
  };

  if (isCheckingSession) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-white/20 border-t-white/70 rounded-full animate-spin" />
      </main>
    );
  }

  if (!session) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-md rounded-xl border border-white/10 bg-card/60 backdrop-blur-md p-6 shadow-2xl">
          <h1 className="mb-4 text-center text-xl font-heading text-foreground">Admin Login</h1>
          <p className="mb-6 text-center text-xs text-muted-foreground">
            Sign in with your admin email and password to manage projects.
          </p>
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="email"
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={loginForm.control}
                name="password"
                rules={{ required: "Password is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full mt-2" disabled={isLoggingIn}>
                {isLoggingIn ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </Form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-heading font-bold text-foreground">Projects Admin</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Create and manage the projects shown in your portfolio.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Log out
          </Button>
        </header>

        {/* Project form */}
        <section className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div className="rounded-xl border border-white/10 bg-card/60 backdrop-blur-md p-5 shadow-2xl">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              New project
            </h2>
            <Form {...projectForm}>
              <form onSubmit={projectForm.handleSubmit(handleProjectSubmit)} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={projectForm.control}
                    name="title"
                    rules={{ required: "Title is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Project title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={projectForm.control}
                    name="category"
                    rules={{ required: "Category is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Input placeholder="Finance, Service, Management..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={projectForm.control}
                  name="description"
                  rules={{ required: "Description is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="Short description of what the project does and what you built."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={projectForm.control}
                  name="techCsv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tech stack</FormLabel>
                      <FormControl>
                        <Input placeholder="React, Node.js, MongoDB, Stripe" {...field} />
                      </FormControl>
                      <FormDescription>Comma-separated list. It will be shown as tags.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={projectForm.control}
                    name="imageUrl"
                    rules={{ required: "Image URL is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormDescription>Use a hosted image (Supabase Storage, CDN, etc.).</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={projectForm.control}
                    name="liveUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Live URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://your-project-live-link.com" {...field} />
                        </FormControl>
                        <FormDescription>Optional. Leave blank if there is no live demo yet.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={projectForm.control}
                    name="sortOrder"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sort order</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={0}
                            {...field}
                            value={field.value ?? 0}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>Lower numbers appear first.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={projectForm.control}
                    name="isFeatured"
                    render={({ field }) => (
                      <FormItem className="flex flex-col justify-end">
                        <FormLabel className="mb-1">Featured</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <input
                              id="isFeatured"
                              type="checkbox"
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                              className="h-4 w-4 rounded border-border bg-background text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            />
                            <label htmlFor="isFeatured" className="text-xs text-muted-foreground">
                              Show this project in the carousel
                            </label>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="mt-2">
                  Add project
                </Button>
              </form>
            </Form>
          </div>

          {/* Existing projects list */}
          <div className="rounded-xl border border-white/10 bg-card/40 backdrop-blur-md p-5 shadow-2xl">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Existing projects
              </h2>
              {isLoadingProjects && (
                <span className="text-[10px] text-muted-foreground">Refreshing…</span>
              )}
            </div>
            <div className="space-y-3 max-h-[420px] overflow-auto pr-1">
              {projects.length === 0 && (
                <p className="text-xs text-muted-foreground">
                  No projects yet. Add your first project using the form.
                </p>
              )}
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-start justify-between gap-3 rounded-lg border border-white/10 bg-background/40 px-3 py-2"
                >
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-foreground">{project.title}</p>
                    <p className="text-[10px] text-muted-foreground">{project.category}</p>
                    <p className="text-[10px] text-muted-foreground">
                      Order: {project.sortOrder} • {project.isFeatured ? "Featured" : "Hidden"}
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="h-7 px-2 text-[10px]"
                    onClick={() => handleDeleteProject(project)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AdminProjectsPage;

