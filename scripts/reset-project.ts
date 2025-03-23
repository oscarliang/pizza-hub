#!/usr/bin/env node

/**
 * This script is used to reset the project to a blank state.
 * It deletes or moves the /app, /components, /hooks, /scripts, and /constants directories to /app-example based on user input and creates a new /app directory with an index.tsx and _layout.tsx file.
 * You can remove the `reset-project` script from package.json and safely delete this file after running it.
 */

import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

const root: string = process.cwd();
const oldDirs: string[] = ["app", "components", "hooks", "constants", "scripts"];
const exampleDir: string = "app-example";
const newAppDir: string = "app";
const exampleDirPath: string = path.join(root, exampleDir);

const indexContent: string = `import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
`;

const layoutContent: string = `import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
`;

const rl: readline.Interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const moveDirectories = async (userInput: string): Promise<void> => {
    try {
        if (userInput === "y") {
            // Create the app-example directory
            await fs.promises.mkdir(exampleDirPath, { recursive: true });
            console.log(`📁 /${exampleDir} directory created.`);
        }

        // Move old directories to new app-example directory or delete them
        for (const dir of oldDirs) {
            const oldDirPath: string = path.join(root, dir);
            if (fs.existsSync(oldDirPath)) {
                if (userInput === "y") {
                    const newDirPath: string = path.join(root, exampleDir, dir);
                    await fs.promises.rename(oldDirPath, newDirPath);
                    console.log(`➡️ /${dir} moved to /${exampleDir}/${dir}.`);
                } else {
                    await fs.promises.rm(oldDirPath, { recursive: true, force: true });
                    console.log(`❌ /${dir} deleted.`);
                }
            } else {
                console.log(`➡️ /${dir} does not exist, skipping.`);
            }
        }

        // Create new /app directory
        const newAppDirPath: string = path.join(root, newAppDir);
        await fs.promises.mkdir(newAppDirPath, { recursive: true });
        console.log("\n📁 New /app directory created.");

        // Create index.tsx
        const indexPath: string = path.join(newAppDirPath, "index.tsx");
        await fs.promises.writeFile(indexPath, indexContent);
        console.log("📄 app/index.tsx created.");

        // Create _layout.tsx
        const layoutPath: string = path.join(newAppDirPath, "_layout.tsx");
        await fs.promises.writeFile(layoutPath, layoutContent);
        console.log("📄 app/_layout.tsx created.");

        console.log("\n✅ Project reset complete. Next steps:");
        console.log(
            `1. Run \`npx expo start\` to start a development server.\n2. Edit app/index.tsx to edit the main screen.${userInput === "y"
                ? `\n3. Delete the /${exampleDir} directory when you're done referencing it.`
                : ""
            }`
        );
    } catch (error) {
        console.error(`❌ Error during script execution: ${error instanceof Error ? error.message : String(error)}`);
    }
};

rl.question(
    "Do you want to move existing files to /app-example instead of deleting them? (Y/n): ",
    (answer: string) => {
        const userInput: string = answer.trim().toLowerCase() || "y";
        if (userInput === "y" || userInput === "n") {
            moveDirectories(userInput).finally(() => rl.close());
        } else {
            console.log("❌ Invalid input. Please enter 'Y' or 'N'.");
            rl.close();
        }
    }
); 