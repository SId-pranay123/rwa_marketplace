import Link from 'next/link';
import React from 'react';
import { case_studies_data } from '../../data/case-studies_data';

const Related_studies = () => {
	return (
		<div>
			{/* <!-- Case Studies --> */}
			<section className="relative py-24">
				<div className="container">
					<div className="mx-auto mb-12 max-w-sm text-center">
						<h2 className="mb-6 text-center font-display text-3xl font-medium text-jacarta-700 dark:text-white">
							Related Case Studies
						</h2>
					</div>
					{/* item */}
					<div className="grid gap-12 md:grid-cols-2">
						{case_studies_data.slice(2).map((item) => {
							const { id, href, img, title } = item;
							return (
								<article key={id}>
									<Link href={'/case-studies/' + href}>
										<span className="dec no-underline">
											<figure className="mb-10 overflow-hidden rounded-2.5xl transition-shadow hover:shadow-xl">
												<img src={img} alt={title} />
											</figure>
										</span>
									</Link>
									<h2 className="group mb-2 max-w-md font-display text-lg text-jacarta-700 dark:text-white">
										<Link href={href}>
											<span className="no-underline text-white group-hover:text-accent ">{title}</span>
										</Link>
									</h2>
									<Link href={href}>
										<span className="no-underline text-sm font-bold text-accent">View Case Study</span>
									</Link>
								</article>
							);
						})}
					</div>
				</div>
			</section>
			{/* <!-- end case studies --> */}
		</div>
	);
};

export default Related_studies;
