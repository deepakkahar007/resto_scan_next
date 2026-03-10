"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";

const HeaderSidebar = () => {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");

    return {
      label: decodeURIComponent(segment),
      href,
    };
  });

  return (
    <header className="flex h-11 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-full"
      />
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((bread, index) => (
            <BreadcrumbItem key={index} className="hidden md:block">
              <BreadcrumbLink href={bread.href}>{bread.label}</BreadcrumbLink>
            </BreadcrumbItem>
          ))}
          <BreadcrumbSeparator className="hidden md:block" />
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
};

export default HeaderSidebar;
