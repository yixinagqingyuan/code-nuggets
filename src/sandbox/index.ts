
import { isString } from './utils'
import { PreviewProxy } from './preview-proxy'
interface SandboxOptions {
    el: string | HTMLElement;
}
let sandbox: HTMLIFrameElement
export default function createSandbox(options: SandboxOptions) {
    const { el } = options
    if (sandbox) {
        sandbox;
    }
    const container = isString(el) ? document.querySelector(el) : el

    sandbox = document.createElement('iframe')
    sandbox.setAttribute(
        "sandbox",
        "allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    );
    sandbox.style.width = "100%";
    sandbox.style.height = "100%";
    sandbox.style.overflow = "hidden";
    sandbox.style.border = "none";
    container.appendChild(sandbox)
    PreviewProxy(sandbox, {

    })
}