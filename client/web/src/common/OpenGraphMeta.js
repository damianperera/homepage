import { Helmet } from "react-helmet"

export const OpenGraphMeta = ({
	title = "Home",
	type = "website",
	link = "https://damianperera.github.io/homepage",
	description = "A replacement browser homepage for developers",
}) => (
	<Helmet>
		<meta charSet="utf-8" />
		<title>{title}</title>
		<meta property="og:type" content={type} />
		<link rel="canonical" href={link} />
		<meta name="og:description" content={description} />
	</Helmet>
)
