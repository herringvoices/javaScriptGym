import { Link } from "react-router-dom";

export default function ProjectSidebar({ project, currentStepId }) {
	const steps = project?.steps || [];
	return (
		<nav className="space-y-4">
			<div>
				<p className="text-xs font-semibold uppercase tracking-wider text-brand-300">Steps</p>
				<ul className="mt-3 space-y-1">
					{steps.map((s, idx) => {
						const isActive = s.id === currentStepId;
						return (
							<li key={s.id}>
								<Link
									to={`/project/${project.id}/${s.id}`}
									className={`block rounded-md px-3 py-1.5 text-sm ${isActive ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}
								>
									<span className="mr-2 text-xs opacity-70">{idx + 1}</span>
									{s.title}
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</nav>
	);
}

