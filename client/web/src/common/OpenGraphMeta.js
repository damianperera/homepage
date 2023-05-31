import { Helmet } from "react-helmet"

export const OpenGraphMeta = ({
	title = "Home",
	description = "A replacement browser homepage for developers",
	type = "website",
	link = window.location.href,
}) => (
	<Helmet>
		<meta charSet="utf-8" />
		<title>{title}</title>
		<meta property="og:type" content={type} />
		<link rel="canonical" href={link} />
		<meta name="og:description" content={description} />
	</Helmet>
)
