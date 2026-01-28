import Link from 'next/link'
import { type Project } from '@/data'

type ProjectCardProps = {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <article>
        {/* Cover image */}
        <div className="aspect-[4/3] bg-neutral-100 rounded-lg overflow-hidden">
          <div className="w-full h-full bg-neutral-200 flex items-center justify-center text-neutral-400 group-hover:bg-neutral-300 transition-colors">
            Project Image
          </div>
        </div>

        {/* Content */}
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex px-2 py-1 text-xs font-medium text-neutral-500 bg-neutral-100 rounded">
              {project.category}
            </span>
            <span className="text-xs text-neutral-400">{project.timeline}</span>
          </div>

          <h3 className="mt-2 text-xl font-semibold group-hover:text-neutral-600 transition-colors">
            {project.title}
          </h3>

          <p className="mt-1 text-neutral-600">{project.subtitle}</p>

          <p className="mt-2 text-sm text-neutral-500">{project.role}</p>
        </div>
      </article>
    </Link>
  )
}
