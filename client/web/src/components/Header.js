import * as React from "react"
import { Menu } from "@mui/icons-material"
import { Box, AppBar, Toolbar, IconButton } from "@mui/material"
import { MainMenuDrawer, SearchEngineBar } from "."

function Header() {
	const [menuToggle, setMenuToggle] = React.useState(false)

	const toggleMenu = (open) => (event) => {
		if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
			return
		}
		setMenuToggle(open)
	}

	return (
		<AppBar position="static">
			<Toolbar sx={{ height: "10vh" }}>
				<IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="menu"
					sx={{ mr: 2 }}
					onClick={toggleMenu(true)}
				>
					<Menu />
				</IconButton>
				<MainMenuDrawer isOpen={menuToggle} onChange={toggleMenu} />
				<Box display="flex" justifyContent="center" alignItems="center" sx={{ flexGrow: 1 }}>
					<SearchEngineBar />
				</Box>
			</Toolbar>
		</AppBar>
	)
}

export default Header
