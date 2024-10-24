import 'dotenv/config';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { folders, snippets, tags, snippetTags } from '@/lib/db/schema';

async function main() {
  const db = drizzle();


  // Sample data to insert into the database
  const dataToSeed = [
    {
      id: '1',
      title: 'React useState Hook',
      description: 'Basic usage of the useState hook in React',
      language: 'react',
      code: `import React, { useState } from 'react';
  
  function Counter() {
    const [count, setCount] = useState(0);
  
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    );
  }`,
      tags: [
        { id: '1', name: 'react' },
        { id: '2', name: 'hooks' },
      ],
    },
    {
      id: '2',
      title: 'Python List Comprehension',
      language: 'python',
      code: `# Create a list of squares
  squares = [x**2 for x in range(10)]
  
  # Create a list of even numbers
  evens = [x for x in range(20) if x % 2 == 0]
  
  # Create a list of tuples
  coordinates = [(x, y) for x in range(5) for y in range(5)]`,
      tags: [
        { id: '3', name: 'python' },
        { id: '4', name: 'list-comprehension' },
      ],
    },
    {
      id: '3',
      title: 'CSS Flexbox Center',
      description: 'Center content both vertically and horizontally using Flexbox',
      language: 'css',
      code: `.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .content {
    /* Your content styles here */
  }`,
      tags: [
        { id: '5', name: 'css' },
        { id: '6', name: 'flexbox' },
      ],
    },
    {
      id: '4',
      title: 'JavaScript Array Map Method',
      description: 'Using the map method to transform an array',
      language: 'javascript',
      code: `const numbers = [1, 2, 3, 4];
  const doubled = numbers.map(num => num * 2);
  
  console.log(doubled); // [2, 4, 6, 8]`,
      tags: [
        { id: '7', name: 'javascript' },
        { id: '8', name: 'array' },
      ],
    },
    {
      id: '5',
      title: 'C# LINQ Query',
      description: 'Basic LINQ query to filter and select items',
      language: 'csharp',
      code: `var numbers = new List<int> { 1, 2, 3, 4, 5 };
  var evenNumbers = numbers.Where(n => n % 2 == 0).ToList();
  
  foreach (var num in evenNumbers) {
      Console.WriteLine(num);
  }`,
      tags: [
        { id: '9', name: 'csharp' },
        { id: '10', name: 'linq' },
      ],
    },
    {
      id: '6',
      title: 'Java For Loop',
      description: 'A simple example of a for loop in Java',
      language: 'java',
      code: `public class Main {
    public static void main(String[] args) {
      for (int i = 0; i < 5; i++) {
        System.out.println("Iteration: " + i);
      }
    }
  }`,
      tags: [
        { id: '11', name: 'java' },
        { id: '12', name: 'loops' },
      ],
    },
    {
      id: '7',
      title: 'Rust Ownership Example',
      description: 'Basic ownership and borrowing concept in Rust',
      language: 'rust',
      code: `fn main() {
      let s1 = String::from("hello");
      let s2 = s1; // s1 is moved, so it cannot be used hereafter
      println!("{}", s2);
  }`,
      tags: [
        { id: '13', name: 'rust' },
        { id: '14', name: 'ownership' },
      ],
    },
    {
      id: '8',
      title: 'SQL INNER JOIN',
      description: 'Example of an INNER JOIN query in SQL',
      language: 'sql',
      code: `SELECT employees.name, departments.name 
  FROM employees 
  INNER JOIN departments 
  ON employees.department_id = departments.id;`,
      tags: [
        { id: '15', name: 'sql' },
        { id: '16', name: 'join' },
      ],
    },
    {
      id: '9',
      title: 'Go Goroutines Example',
      description: 'Simple goroutine example in Go',
      language: 'go',
      code: `package main
  
  import (
    "fmt"
    "time"
  )
  
  func main() {
    go func() {
      fmt.Println("Hello from a goroutine")
    }()
  
    time.Sleep(time.Second) // Wait for the goroutine to finish
  }`,
      tags: [
        { id: '17', name: 'go' },
        { id: '18', name: 'concurrency' },
      ],
    },
    {
      id: '10',
      title: 'Elixir Pattern Matching',
      description: 'Demonstrating pattern matching in Elixir',
      language: 'elixir',
      code: `defmodule Demo do
    def match_example({a, b}) do
      IO.puts("The first element is \#{a}")
      IO.puts("The second element is \#{b}")
    end
  end
  
  Demo.match_example({1, 2})`,
      tags: [
        { id: '19', name: 'elixir' },
        { id: '20', name: 'pattern-matching' },
      ],
    },
    {
      id: '11',
      title: 'TypeScript Interface Example',
      description: 'Defining an interface in TypeScript',
      language: 'typescript',
      code: `interface User {
    name: string;
    age: number;
    email?: string; // Optional property
  }
  
  const user: User = {
    name: 'John Doe',
    age: 25
  };
  
  console.log(user.name);`,
      tags: [
        { id: '21', name: 'typescript' },
        { id: '22', name: 'interface' },
      ],
    },
    {
      id: '12',
      title: 'Ruby Each Iterator',
      description: 'Using the each iterator in Ruby to loop through an array',
      language: 'ruby',
      code: `numbers = [1, 2, 3, 4, 5]
  
  numbers.each do |num|
    puts "The number is \#{num}"
  end`,
      tags: [
        { id: '23', name: 'ruby' },
        { id: '24', name: 'iterator' },
      ],
    },
    {
      id: '14',
      title: 'Swift Optionals',
      description: 'Handling optionals in Swift',
      language: 'swift',
      code: `var name: String? = "John"
  if let unwrappedName = name {
      print("The name is \\\(unwrappedName)")
  } else {
      print("No name provided")
  }`,
      tags: [
        { id: '27', name: 'swift' },
        { id: '28', name: 'optionals' },
      ],
    },
    {
      id: '15',
      title: 'Kotlin Lambda Functions',
      description: 'Using lambda functions in Kotlin',
      language: 'kotlin',
      code: `val numbers = listOf(1, 2, 3, 4, 5)
  val doubled = numbers.map { it * 2 }
  println(doubled)`,
      tags: [
        { id: '29', name: 'kotlin' },
        { id: '30', name: 'lambda' },
      ],
    },
    {
      id: '16',
      title: 'Bash Script Example',
      description: 'A basic bash script to print a message',
      language: 'bash',
      code: `#!/bin/bash
  echo "Hello, World!"
  for i in {1..5}
  do
     echo "Iteration: $i"
  done`,
      tags: [
        { id: '31', name: 'bash' },
        { id: '32', name: 'scripting' },
      ],
    },
    {
      id: '17',
      title: 'R Data Frame Example',
      description: 'Creating and manipulating a data frame in R',
      language: 'r',
      code: `# Create a data frame
  df <- data.frame(
    name = c("Alice", "Bob", "Charlie"),
    age = c(25, 30, 35)
  )
  
  # Print the data frame
  print(df)
  
  # Filter rows where age > 30
  filtered_df <- subset(df, age > 30)
  print(filtered_df)`,
      tags: [
        { id: '33', name: 'r' },
        { id: '34', name: 'data-frame' },
      ],
    },
    {
      id: '18',
      title: 'Perl Regular Expression',
      description: 'Using regular expressions in Perl',
      language: 'perl',
      code: `my $string = "The quick brown fox";
  if ($string =~ /quick/) {
    print "Match found!";
  } else {
    print "No match.";
  }`,
      tags: [
        { id: '35', name: 'perl' },
        { id: '36', name: 'regex' },
      ],
    },
    {
      id: '19',
      title: 'Haskell List Comprehension',
      description: 'Creating lists using comprehension in Haskell',
      language: 'haskell',
      code: `let squares = [x^2 | x <- [1..10]]
  let evenSquares = [x | x <- squares, even x]
  print evenSquares`,
      tags: [
        { id: '37', name: 'haskell' },
        { id: '38', name: 'list-comprehension' },
      ],
    },
    {
      id: '20',
      title: 'Scala Map Example',
      description: 'Using map function in Scala to transform a list',
      language: 'scala',
      code: `val numbers = List(1, 2, 3, 4)
  val doubled = numbers.map(_ * 2)
  println(doubled)`,
      tags: [
        { id: '39', name: 'scala' },
        { id: '40', name: 'map' },
      ],
    },
  ];

  // Insert tags first
  const insertedTags = {} as Record<string, any>;
  for (const snippet of dataToSeed) {
    for (const tag of snippet.tags) {
      if (!insertedTags[tag.id]) {
        const insertedTag = await db
          .insert(tags)
          .values({
            name: tag.name,
            userId: 'user_2no3wumOmtDd4RcRH89pC6YNUeK',
          })
          .returning();
        insertedTags[tag.id] = insertedTag[0];
      }
    }
  }

  // Insert snippets and associate tags
  for (const snippet of dataToSeed) {
    const insertedSnippet = await db
      .insert(snippets)
      .values({
        title: snippet.title,
        description: snippet.description || null,
        language: snippet.language,
        code: snippet.code,
        userId: 'user_2no3wumOmtDd4RcRH89pC6YNUeK',
      })
      .returning();

    // Insert into snippetTags
    for (const tag of snippet.tags) {
      await db.insert(snippetTags).values({
        snippetId: insertedSnippet[0].id,
        tagId: insertedTags[tag.id].id,
      });
    }
  }

  console.log('Database seeded successfully with new data!');
}

main();
