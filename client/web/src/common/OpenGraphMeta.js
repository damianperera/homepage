import { Helmet } from "react-helmet"

export const OpenGraphMeta = ({
	title = "Home",
	description = "A replacement browser homepage for developers",
	type = "website",
	link = "https://damianperera.github.io/homepage",
}) => (
	<Helmet>
		<title>{title}</title>
		<meta name="og:description" content={description} data-react-helmet="true" />
		<meta property="og:type" content={type} data-react-helmet="true" />
		<link rel="canonical" href={link} data-react-helmet="true" />
	</Helmet>
)
