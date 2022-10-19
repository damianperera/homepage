import * as React from "react"
import { Google, Code, PrivacyTip, Search } from "@mui/icons-material"
import {
	TextField,
	FormControl,
	Stack,
	IconButton,
	MenuItem,
	InputAdornment,
	Select,
} from "@mui/material"
import Mousetrap from "mousetrap"
import { AppContext } from "../common"

function SearchEngineBar() {
	const googleSearchURL = "https://www.google.com/search"
	const stackOverflowSearchURL = "https://stackoverflow.com/search"
	const duckDuckGoSearchURL = "https://duckduckgo.com"

	const [context, setContext] = React.useContext(AppContext)
	const [searchEngine, setSearchEngine] = React.useState(googleSearchURL)

	const handleSearchEngineChange = (event) => {
		setSearchEngine(event.target.value)
	}

	Mousetrap.bind("shift+g", () => setSearchEngine(googleSearchURL))
	Mousetrap.bind("shift+s", () => setSearchEngine(stackOverflowSearchURL))
	Mousetrap.bind("shift+d", () => setSearchEngine(duckDuckGoSearchURL))
	Mousetrap.bind("shift+r", () =>
		setContext({
			...context,
			dataLoad: !context.dataLoad,
		})
	)

	return (
		<form action={searchEngine}>
			<FormControl
				variant="standard"
				sx={{ border: "1px solid rgba(81, 81, 81, 1)", borderRadius: "4px" }}
			>
				<TextField
					autoFocus
					name="q"
					required
					id="search"
					placeholder={`Enter search text`}
					variant="outlined"
					sx={{
						width: "70vh",
						"& .MuiOutlinedInput-root.Mui-focused": {
							"& > fieldset": {
								border: 0,
							},
						},
						"& .MuiInputBase-root": {
							"& > fieldset": {
								border: "0 !important",
							},
						},
					}}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<Select
									labelId="search-engine-label"
									id="search-engine"
									value={searchEngine}
									onChange={handleSearchEngineChange}
									sx={{
										boxShadow: "none",
										".MuiOutlinedInput-notchedOutline": { border: 0 },
										"& .MuiOutlinedInput-root.Mui-focused": {
											"& > fieldset": {
												border: 0,
											},
										},
										width: "19vh",
									}}
								>
									<MenuItem value={googleSearchURL}>
										<Stack direction="row" alignItems="center" gap={1}>
											<Google /> Google
										</Stack>
									</MenuItem>
									<MenuItem value={stackOverflowSearchURL}>
										<Stack direction="row" alignItems="center" gap={1}>
											<Code /> Stack Overflow
										</Stack>
									</MenuItem>
									<MenuItem value={duckDuckGoSearchURL}>
										<Stack direction="row" alignItems="center" gap={1}>
											<PrivacyTip /> DuckDuckGo
										</Stack>
									</MenuItem>
								</Select>
							</InputAdornment>
						),
						endAdornment: (
							<IconButton type="submit" aria-label="search" size="small">
								<Search />
							</IconButton>
						),
					}}
				/>
			</FormControl>
		</form>
	)
}

export default SearchEngineBar
