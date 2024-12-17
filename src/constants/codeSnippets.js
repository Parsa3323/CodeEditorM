export const CODE_SNIPPETS = {
  javascript: `// Welcome to JavaScript!
function greet(name) {
  console.log("Hello, " + name + "!");
}

greet("World");`,
  python: `# Welcome to Python!
def greet(name):
    print("Hello, " + name + "!")

greet("World")`,
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  csharp: `using System;

class Program {
    static void Main(string[] args) {
        Console.WriteLine("Hello, World!");
    }
}`,
  php: `<?php
$name = "World";
echo "Hello, " . $name . "!";
?>`,
  typescript: `// Welcome to TypeScript!
interface Greeting {
    name: string;
}

function greet(data: Greeting): void {
    console.log("Hello, " + data.name + "!");
}

greet({ name: "World" });`
};