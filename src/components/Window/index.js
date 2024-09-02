import Window from "./window.svelte"
import Collapsible from "./window-collapsible.svelte"
import Head from "./window-head.svelte"
import Menu from "./window-menu.svelte"
import Body from "./window-body.svelte"

Window.Collapsible = Collapsible
Window.Head = Head
Window.Menu = Menu
Window.Body = Body

export default Window