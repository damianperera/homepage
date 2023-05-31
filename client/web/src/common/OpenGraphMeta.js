import { Helmet } from "react-helmet"

export const OpenGraphMeta = (
	title = "Dev Homepage",
	type = "website",
	link = "https://damianperera.github.io/homepage",
	description = "A replacement browser homepage for developers"
) => {
	return (
		<Helmet>
			<meta charSet="utf-8" />
			<title>{title}</title>
			<meta property="og:type" content={type} />
			<link rel="canonical" href={link} />
			<meta name="description" content={description} />
		</Helmet>
	)
}
