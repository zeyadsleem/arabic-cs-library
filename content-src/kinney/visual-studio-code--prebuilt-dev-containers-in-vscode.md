---
title: "Prebuilt Dev Containers in Visual Studio Code"
lang: "en"
chapter: "visual-studio-code"
slug: "prebuilt-dev-containers-in-vscode"
order: 50
source: "https://stevekinney.com/courses/visual-studio-code/prebuilt-dev-containers-in-vscode"
---

Visual Studio Code and the community provide a rich collection of pre-built Dev Container definitions. These are incredibly useful for quickly setting up common development environments without writing `devcontainer.json` from scratch.

## Accessing Pre-built Definitions

When you use the “Dev Containers: Add Dev Container Configuration Files…” command, Visual Studio Code will offer a list of predefined definitions. These are fetched from the [vscode-dev-containers repository on GitHub](https://github.com/devcontainers/templates).

**Example: Using a Pre-built Python Definition:**

1. Open your project folder in Visual Studio Code.
2. Open the Command Palette and select “Dev Containers: Add Dev Container Configuration Files…“.
3. Choose “Python 3”.
4. Visual Studio Code generates a `.devcontainer` folder with a pre-configured `devcontainer.json` for Python development.
5. Open the folder in a Dev Container (as explained in the next section).

**Customizing Pre-built Definitions:**

Pre-built definitions are excellent starting points. You can customize them further by modifying the generated `devcontainer.json` file—adding more extensions, customizing settings, forwarding ports, adding a `postCreateCommand`, and more to tailor the environment to your project needs.

## Working with Dev Containers: Your Daily Development Workflow

Now that you’ve set up a Dev Container, let’s explore how to work with it effectively.

### Opening a Folder in a Container: Connecting to Your Environment

Once you have a `.devcontainer` folder in your project, Visual Studio Code will recognize it and offer options to work within the Dev Container.

**Opening a Folder in a Dev Container:**

- **Option 1 (Recommended): Reopen in Container** Open your project folder in Visual Studio Code (the folder contains the `.devcontainer` folder). Visual Studio Code detects the Dev Container configuration and displays a notification: “Dev Container: Folder contains a Dev Container configuration file.” Click “Reopen in Container.” Visual Studio Code builds (if necessary) and starts the Dev Container. Once ready, it reloads and shows “(Dev Container)” in the bottom-left corner.
  1. Open your project folder in Visual Studio Code (the folder contains the `.devcontainer` folder).
  2. Visual Studio Code detects the Dev Container configuration and displays a notification: “Dev Container: Folder contains a Dev Container configuration file.”
  3. Click “Reopen in Container.”
  4. Visual Studio Code builds (if necessary) and starts the Dev Container. Once ready, it reloads and shows “(Dev Container)” in the bottom-left corner.
- **Option 2: Command Palette – “Dev Containers: Reopen in Container”** Open your project folder. Open the Command Palette and select “Dev Containers: Reopen in Container.” Follow the same process as Option 1.
  1. Open your project folder.
  2. Open the Command Palette and select “Dev Containers: Reopen in Container.”
  3. Follow the same process as Option 1.
- **Option 3: Remote Explorer (Optional)** The Remote Explorer view (accessible via the Remote icon in the Activity Bar) also lists available Dev Containers. However, “Reopen in Container” is generally more direct.

**What Happens When You “Reopen in Container”?**

- **Container Build (If Necessary):**
Visual Studio Code triggers a Docker build if the specified image (or Dockerfile) needs to be built. Build logs appear in the Output panel, and subsequent reopens are faster due to Docker caching.
- **Container Start:**
Docker starts the container as configured.
- **Visual Studio Code Connection:**
Visual Studio Code connects to the running container.
- **Workspace Mount:**
Your project folder is **bind-mounted** into the container at the `workspaceFolder` (default `/workspace`), ensuring changes sync between host and container.
- **Extension Installation (Inside Container):**
Extensions listed in `devcontainer.json` are automatically installed inside the container.
- **Settings Application (Inside Container):**
Settings defined in `devcontainer.json` are applied within the container environment.

### Building and Rebuilding Containers: Updating Your Environment

Sometimes you need to modify your Dev Container configuration. In such cases, rebuild the container.

**Building or Rebuilding a Dev Container:**

- **Option 1: Command Palette – “Dev Containers: Rebuild Container”** Ensure you are connected to your Dev Container. Open the Command Palette and select “Dev Containers: Rebuild Container.” Visual Studio Code rebuilds the container image based on your updated Dockerfile or image specification, then restarts the container.
  1. Ensure you are connected to your Dev Container.
  2. Open the Command Palette and select “Dev Containers: Rebuild Container.”
  3. Visual Studio Code rebuilds the container image based on your updated Dockerfile or image specification, then restarts the container.
- **Option 2: Command Palette – “Dev Containers: Rebuild and Reopen in Container”** Similar to the previous option but automatically reopens your project in the newly rebuilt container.
  1. Similar to the previous option but automatically reopens your project in the newly rebuilt container.
- **When to Rebuild:** Changes to the `Dockerfile` (adding software, updating dependencies, or changing the base image). Changes to `devcontainer.json` (switching to a different base image or Dockerfile). Manual software updates inside the container (though it’s better to define these in the Dockerfile).
  - Changes to the `Dockerfile` (adding software, updating dependencies, or changing the base image).
  - Changes to `devcontainer.json` (switching to a different base image or Dockerfile).
  - Manual software updates inside the container (though it’s better to define these in the Dockerfile).

### Accessing the Terminal: Your Gateway to the Container

The integrated terminal in Visual Studio Code runs *inside* the Dev Container.

**Accessing the Dev Container Terminal:**

- **Option 1: Visual Studio Code Integrated Terminal** Ensure you are connected to your Dev Container. Open the integrated terminal (Ctrl+`or Cmd+`). The terminal prompt shows you are inside the container (using the shell configured in your container image or `devcontainer.json`).
  1. Ensure you are connected to your Dev Container.
  2. Open the integrated terminal (Ctrl+`or Cmd+`).
  3. The terminal prompt shows you are inside the container (using the shell configured in your container image or `devcontainer.json`).

**Usage:**

- **Execute Commands:** Run commands such as build scripts, tests, or dependency management directly within the container.
- **Temporary Software Installation:** Install packages (via apt, npm, pip, etc.) as needed, though changes won’t persist across restarts unless added to the Dockerfile.
- **Debug and Troubleshoot:** Use the terminal to inspect logs and troubleshoot container issues.

### Installing Extensions: Enhancing Your Containerized IDE

Dev Containers allow you to install Visual Studio Code extensions directly within the container.

**Installing Extensions Inside the Dev Container:**

- **Automatic Installation:**
List essential extensions in the `extensions` property of `devcontainer.json` to have them automatically installed when the container starts.
- **Manual Installation:** Ensure you are connected to the Dev Container. Open the Extensions view (Ctrl+Shift+X or Cmd+Shift+X). Locate the section “Dev Container: [Container Name] - Installed” and install extensions there.
  1. Ensure you are connected to the Dev Container.
  2. Open the Extensions view (Ctrl+Shift+X or Cmd+Shift+X).
  3. Locate the section “Dev Container: [Container Name] - Installed” and install extensions there.

**Benefits:**

- Ensures consistency across the team.
- Reduces clutter on your host machine.
- Allows project-specific configuration.

### Sharing Workspaces: Collaborative Containerized Development

Sharing your Dev Container configuration via version control ensures every team member uses the same environment.

**How to Share:**

- **Version Control:**
Commit the `.devcontainer` folder (including `devcontainer.json` and optionally a `Dockerfile` or `docker-compose.yml`) to Git.
- **Team Cloning:**
When team members clone the repository and open it in Visual Studio Code with the Remote - Containers extension, they will be prompted to “Reopen in Container” and receive the same environment.

**Benefits:**

- Consistency across the team.
- Version history for configuration changes.
- Simplified onboarding for new team members.

## Customizing Dev Containers: Tailoring Your Environment

Dev Containers offer extensive customization options.

### Dockerfiles: Fine-Grained Control

For advanced customization, use a Dockerfile.

**Using Dockerfiles:**

1. Create a `Dockerfile` within the `.devcontainer` folder.
2. In `devcontainer.json`, replace the `image` property with `dockerFile` and specify the Dockerfile path: <code><span class="line"><span style="color:#D6DEEB">{</span></span>
<span class="line"><span style="color:#7FDBCA"> "dockerFile"</span><span style="color:#D6DEEB">: </span><span style="color:#D9F5DD">"</span><span style="color:#C789D6">Dockerfile</span><span style="color:#D9F5DD">"</span></span>
<span class="line"><span style="color:#D6DEEB">}</span></span></code> Use a relative path if the Dockerfile isn’t in the same folder.

**Examples:**

- **Installing Software:** <code><span class="line"><span style="color:#7FDBCA">FROM</span><span style="color:#D6DEEB"> mcr.microsoft.com/devcontainers/javascript-node:18</span></span>
<span class="line"><span style="color:#7FDBCA">RUN</span><span style="color:#D6DEEB"> apt-get update && apt-get install -y --no-install-recommends \</span></span>
<span class="line"><span style="color:#D6DEEB"> graphicsmagick</span></span></code>
- **Configuring Settings:** <code><span class="line"><span style="color:#7FDBCA">FROM</span><span style="color:#D6DEEB"> mcr.microsoft.com/devcontainers/python:3.10</span></span>
<span class="line"><span style="color:#7FDBCA">RUN</span><span style="color:#D6DEEB"> echo </span><span style="color:#ECC48D">"en_US.UTF-8 UTF-8"</span><span style="color:#D6DEEB"> >> /etc/locale.gen && locale-gen</span></span>
<span class="line"><span style="color:#7FDBCA">ENV</span><span style="color:#D6DEEB"> LANG en_US.UTF-8</span></span>
<span class="line"><span style="color:#7FDBCA">ENV</span><span style="color:#D6DEEB"> LANGUAGE en_US:en</span></span>
<span class="line"><span style="color:#7FDBCA">ENV</span><span style="color:#D6DEEB"> LC_ALL en_US.UTF-8</span></span></code>
- **Setting Up Services:** <code><span class="line"><span style="color:#7FDBCA">FROM</span><span style="color:#D6DEEB"> mcr.microsoft.com/devcontainers/go:1.20</span></span>
<span class="line"><span style="color:#7FDBCA">RUN</span><span style="color:#D6DEEB"> apt-get update && apt-get install -y --no-install-recommends \</span></span>
<span class="line"><span style="color:#D6DEEB"> postgresql-client</span></span></code>

**Best Practices:**

- Use a reputable base image.
- Optimize layering for caching.
- Keep the Dockerfile minimal.
- Pin dependency versions for reproducibility.

### dotfiles: Personalizing Your Environment

Mount your host’s dotfiles to personalize your container.

**Using dotfiles:**

1. Add a `dotfiles` property in `devcontainer.json`: <code><span class="line"><span style="color:#D6DEEB">{</span></span>
<span class="line"><span style="color:#7FDBCA"> "dotfiles"</span><span style="color:#D6DEEB">: {</span></span>
<span class="line"><span style="color:#7FDBCA"> "repository"</span><span style="color:#D6DEEB">: </span><span style="color:#D9F5DD">"</span><span style="color:#C789D6">https://github.com/your-username/dotfiles</span><span style="color:#D9F5DD">"</span><span style="color:#D6DEEB">,</span></span>
<span class="line"><span style="color:#7FDBCA"> "targetPath"</span><span style="color:#D6DEEB">: </span><span style="color:#D9F5DD">"</span><span style="color:#C789D6">~</span><span style="color:#D9F5DD">"</span><span style="color:#D6DEEB">,</span></span>
<span class="line"><span style="color:#7FDBCA"> "installCommand"</span><span style="color:#D6DEEB">: </span><span style="color:#D9F5DD">"</span><span style="color:#C789D6">install.sh</span><span style="color:#D9F5DD">"</span></span>
<span class="line"><span style="color:#D6DEEB"> }</span></span>
<span class="line"><span style="color:#D6DEEB">}</span></span></code> **repository:** URL to your dotfiles repo. **targetPath:** Path inside the container (default `~`). **installCommand:** Script executed post-cloning.
  - **repository:** URL to your dotfiles repo.
  - **targetPath:** Path inside the container (default `~`).
  - **installCommand:** Script executed post-cloning.
2. Structure your dotfiles repository with files like `.bashrc`, `.gitconfig`, and an `install.sh` script: <code>dotfiles-repository/
├── .bashrc
├── .gitconfig
├── .vimrc
└── install.sh</code>
3. **Example `install.sh`:** <code><span class="line"><span style="color:#637777;font-style:italic">#!/bin/bash</span></span>
<span class="line"><span style="color:#82AAFF;font-style:italic">ln</span><span style="color:#82AAFF"> -sf</span><span style="color:#D9F5DD"> "</span><span style="color:#C5E478">$DOTFILES_REPOSITORY</span><span style="color:#ECC48D">/.bashrc</span><span style="color:#D9F5DD">"</span><span style="color:#D9F5DD"> "</span><span style="color:#C5E478">$HOME</span><span style="color:#ECC48D">/.bashrc</span><span style="color:#D9F5DD">"</span></span>
<span class="line"><span style="color:#82AAFF;font-style:italic">ln</span><span style="color:#82AAFF"> -sf</span><span style="color:#D9F5DD"> "</span><span style="color:#C5E478">$DOTFILES_REPOSITORY</span><span style="color:#ECC48D">/.gitconfig</span><span style="color:#D9F5DD">"</span><span style="color:#D9F5DD"> "</span><span style="color:#C5E478">$HOME</span><span style="color:#ECC48D">/.gitconfig</span><span style="color:#D9F5DD">"</span></span>
<span class="line"><span style="color:#82AAFF;font-style:italic">ln</span><span style="color:#82AAFF"> -sf</span><span style="color:#D9F5DD"> "</span><span style="color:#C5E478">$DOTFILES_REPOSITORY</span><span style="color:#ECC48D">/.vimrc</span><span style="color:#D9F5DD">"</span><span style="color:#D9F5DD"> "</span><span style="color:#C5E478">$HOME</span><span style="color:#ECC48D">/.vimrc</span><span style="color:#D9F5DD">"</span></span>
<span class="line"><span style="color:#C5E478;font-style:italic">echo</span><span style="color:#D9F5DD"> "</span><span style="color:#ECC48D">Dotfiles installation complete!</span><span style="color:#D9F5DD">"</span></span></code>

**Benefits:**

- Personalizes the container environment.
- Ensures consistency across systems.
- Version-controls your configurations.
- Enables portability.

### Advanced Capabilities

**Bind Mounts:**

- Mount host directories into the container.
- Define in `devcontainer.json` using the `mounts` property: <code><span class="line"><span style="color:#D6DEEB">{</span></span>
<span class="line"><span style="color:#7FDBCA"> "mounts"</span><span style="color:#D6DEEB">: [</span></span>
<span class="line"><span style="color:#D9F5DD"> "</span><span style="color:#C789D6">source=${localWorkspaceFolder}/data,target=/container/data,type=bind,consistency=cached</span><span style="color:#D9F5DD">"</span></span>
<span class="line"><span style="color:#D6DEEB"> ]</span></span>
<span class="line"><span style="color:#D6DEEB">}</span></span></code> **source:** Host path. **target:** Container path. **type:** Set as `bind`. **consistency:** Optional (e.g., `cached`).
  - **source:** Host path.
  - **target:** Container path.
  - **type:** Set as `bind`.
  - **consistency:** Optional (e.g., `cached`).

**Port Forwarding:**

- Use the `forwardPorts` property to forward container ports to the host.
- Visual Studio Code can auto-detect and prompt for forwarded ports.

**Docker Compose:**

- Define multi-container environments with a `docker-compose.yml` file.
- Modify `devcontainer.json` to use `dockerComposeFile`, and specify `service` and `workspaceFolder`: <code><span class="line"><span style="color:#D6DEEB">{</span></span>
<span class="line"><span style="color:#7FDBCA"> "dockerComposeFile"</span><span style="color:#D6DEEB">: </span><span style="color:#D9F5DD">"</span><span style="color:#C789D6">docker-compose.yml</span><span style="color:#D9F5DD">"</span><span style="color:#D6DEEB">,</span></span>
<span class="line"><span style="color:#7FDBCA"> "service"</span><span style="color:#D6DEEB">: </span><span style="color:#D9F5DD">"</span><span style="color:#C789D6">app</span><span style="color:#D9F5DD">"</span><span style="color:#D6DEEB">,</span></span>
<span class="line"><span style="color:#7FDBCA"> "workspaceFolder"</span><span style="color:#D6DEEB">: </span><span style="color:#D9F5DD">"</span><span style="color:#C789D6">/app</span><span style="color:#D9F5DD">"</span></span>
<span class="line"><span style="color:#D6DEEB">}</span></span></code>
- **Example `docker-compose.yml`:** <code><span class="line"><span style="color:#7FDBCA">version</span><span style="color:#D6DEEB">: </span><span style="color:#D9F5DD">'</span><span style="color:#ECC48D">3.8</span><span style="color:#D9F5DD">'</span></span>
<span class="line"><span style="color:#7FDBCA">services</span><span style="color:#D6DEEB">:</span></span>
<span class="line"><span style="color:#7FDBCA"> app</span><span style="color:#D6DEEB">:</span></span>
<span class="line"><span style="color:#7FDBCA"> build</span><span style="color:#D6DEEB">:</span></span>
<span class="line"><span style="color:#7FDBCA"> context</span><span style="color:#D6DEEB">: </span><span style="color:#ECC48D">./app</span></span>
<span class="line"><span style="color:#7FDBCA"> dockerfile</span><span style="color:#D6DEEB">: </span><span style="color:#ECC48D">Dockerfile</span></span>
<span class="line"><span style="color:#7FDBCA"> ports</span><span style="color:#D6DEEB">:</span></span>
<span class="line"><span style="color:#D6DEEB"> - </span><span style="color:#D9F5DD">'</span><span style="color:#ECC48D">3000:3000</span><span style="color:#D9F5DD">'</span></span>
<span class="line"><span style="color:#7FDBCA"> volumes</span><span style="color:#D6DEEB">:</span></span>
<span class="line"><span style="color:#D6DEEB"> - </span><span style="color:#ECC48D">./app:/app</span></span>
<span class="line"><span style="color:#7FDBCA"> db</span><span style="color:#D6DEEB">:</span></span>
<span class="line"><span style="color:#7FDBCA"> image</span><span style="color:#D6DEEB">: </span><span style="color:#ECC48D">postgres:14</span></span>
<span class="line"><span style="color:#7FDBCA"> environment</span><span style="color:#D6DEEB">:</span></span>
<span class="line"><span style="color:#7FDBCA"> POSTGRES_USER</span><span style="color:#D6DEEB">: </span><span style="color:#ECC48D">devuser</span></span>
<span class="line"><span style="color:#7FDBCA"> POSTGRES_PASSWORD</span><span style="color:#D6DEEB">: </span><span style="color:#ECC48D">devpassword</span></span>
<span class="line"><span style="color:#7FDBCA"> ports</span><span style="color:#D6DEEB">:</span></span>
<span class="line"><span style="color:#D6DEEB"> - </span><span style="color:#D9F5DD">'</span><span style="color:#ECC48D">5432:5432</span><span style="color:#D9F5DD">'</span></span>
<span class="line"><span style="color:#7FDBCA"> volumes</span><span style="color:#D6DEEB">:</span></span>
<span class="line"><span style="color:#D6DEEB"> - </span><span style="color:#ECC48D">db_data:/var/lib/postgresql/data</span></span>
<span class="line"><span style="color:#7FDBCA">volumes</span><span style="color:#D6DEEB">:</span></span>
<span class="line"><span style="color:#7FDBCA"> db_data</span><span style="color:#D6DEEB">:</span></span></code>

**GitHub Codespaces Integration:**

- If a project contains a `.devcontainer` folder, Codespaces uses it to create a cloud-based environment.
- **Benefits:** Cloud-based access, pre-configured environments, and seamless local-to-cloud transitions.

## Troubleshooting and Best Practices

### Common Issues

- **Container Build Errors:** Review build logs. Check Dockerfile syntax, network, resource limits, and rate limits. Rebuild with a clean cache if needed.
  - Review build logs.
  - Check Dockerfile syntax, network, resource limits, and rate limits.
  - Rebuild with a clean cache if needed.
- **Container Startup Failures:** Examine container logs. Verify resource allocation and port conflicts. Check Dockerfile/image issues.
  - Examine container logs.
  - Verify resource allocation and port conflicts.
  - Check Dockerfile/image issues.
- **Extension Installation Issues:** Ensure container internet connectivity. Verify extension compatibility. Restart Visual Studio Code or reload the container.
  - Ensure container internet connectivity.
  - Verify extension compatibility.
  - Restart Visual Studio Code or reload the container.
- **Performance Issues:** Increase Docker Desktop resources. Optimize Dockerfile layering and base image size. Consider using Docker volumes over bind mounts. Limit installed extensions.
  - Increase Docker Desktop resources.
  - Optimize Dockerfile layering and base image size.
  - Consider using Docker volumes over bind mounts.
  - Limit installed extensions.

### Performance Optimization

- Allocate sufficient CPU/memory in Docker Desktop.
- Optimize Dockerfiles for caching and minimal image size.
- Use Docker volumes where beneficial.
- Install only essential extensions.
- Minimize background processes.
- Choose efficient base images.
- Configure Visual Studio Code caching optimally.

### Security Considerations

- **Container Image Security:** Use trusted base images and scan for vulnerabilities. Minimize image size. Regularly update images and dependencies.
  - Use trusted base images and scan for vulnerabilities.
  - Minimize image size.
  - Regularly update images and dependencies.
- **Network Security:** Forward only necessary ports. Understand container networking. Manage secrets securely (use environment variables).
  - Forward only necessary ports.
  - Understand container networking.
  - Manage secrets securely (use environment variables).
- **Host Access:** Follow least privilege principles for bind mounts. Use read-only mounts when possible.
  - Follow least privilege principles for bind mounts.
  - Use read-only mounts when possible.
- **User Permissions:** Run containers as non-root. Consider Docker user namespaces for extra isolation.
  - Run containers as non-root.
  - Consider Docker user namespaces for extra isolation.

## Real-World Examples: Dev Containers in Action

### Node.js Development Environment

Setting up a Node.js environment with specific npm packages and configurations for a web application.

`devcontainer.json`:

```json
{
  "name": "Node.js Web App",
  "image": "mcr.microsoft.com/devcontainers/javascript-node:18",
  "extensions": ["dbaeumer.vscode-eslint", "esbenp.prettier-vscode", "ms-vscode.js-debug-nodejs"],
  "settings": {
    "terminal.integrated.shell.linux": "/bin/bash",
    "editor.formatOnSave": true
  },
  "forwardPorts": [3000],
  "postCreateCommand": "npm install"
}
```

- Uses the Node.js 18 image.
- Installs ESLint, Prettier, and a debugger.
- Sets the terminal to bash with format-on-save enabled.
- Forwards port 3000.
- Runs `npm install` after container creation.
