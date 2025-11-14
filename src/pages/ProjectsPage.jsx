import { useNavigate } from "react-router-dom";
import StandardsBadges from "../components/StandardsBadges";
import { projects } from "../projects/manifest";

export default function ProjectsPage() {
	const navigate = useNavigate();
	return (
		<section className="space-y-8">
			<header className="space-y-2">
				<p className="text-sm uppercase tracking-widest text-brand-300">Capstones</p>
				<h1 className="text-3xl font-semibold text-white">Projects</h1>
				<p className="max-w-2xl text-sm text-slate-300">
					Explore guided projects with multiple steps. Your code edits are saved automatically in your browser.
				</p>
			</header>

			<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
				{projects.map((proj) => (
					<ProjectCard key={proj.id} project={proj} onOpen={() => navigate(`/project/${proj.id}`)} />
				))}
			</div>
		</section>
	);
}

function ProjectCard({ project, onOpen }) {
	return (
		<div className="group relative flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-left shadow-card">
			<div className="flex items-start justify-between gap-4">
				<div className="flex-1">
					<p className="text-xs font-semibold uppercase tracking-wider text-brand-300">Project</p>
					<h2 className="mt-1 text-lg font-semibold text-white">{project.title}</h2>
				</div>
				<span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-200">
					{project.steps?.length || 0} steps
				</span>
			</div>
			{project.summary ? (
				<p className="mt-3 text-sm text-slate-300">{project.summary}</p>
			) : null}
			<StandardsBadges standards={project.standards} size="sm" className="mt-4" />
			<div className="mt-4 flex items-center justify-end">
				<button
					type="button"
					onClick={onOpen}
					className="inline-flex items-center rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-brand-400"
				>
					Open project
				</button>
			</div>
		</div>
	);
}

