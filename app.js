const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

function main() {
	const teams = [];

	function buildHtml() {
		if (!fs.existsSync(OUTPUT_DIR)) {
			fs.mkdirSync(OUTPUT_DIR);
		}
		fs.writeFileSync(outputPath, render(teams));
	}

	function buildTeam() {
		inquirer
			.prompt([
				{
					type: "list",
					name: "typeOfEmployee",
					message: "Which type of member do you want to add?",
					choices: ["Engineer", "Intern", "Done"],
				},
			])
			.then((choice) => {
				if (choice.typeOfEmployee === "Engineer") {
					console.log("Enter Engineer Info");

					inquirer
						.prompt([
							{
								type: "input",
								name: "name",
								message: "Name:",
							},
							{
								type: "input",
								name: "email",
								message: "Email:",
							},
							{
								type: "input",
								name: "github",
								message: "Github:",
							},
							{
								type: "input",
								name: "id",
								message: "ID:",
							},
						])
						.then(({ name, email, github, id }) => {
							teams.push(new Engineer(name, id, email, github));

							buildTeam();
						});
				}

				if (choice.typeOfEmployee === "Intern") {
					console.log("Enter Intern Info");

					inquirer
						.prompt([
							{
								type: "input",
								name: "name",
								message: "Name:",
							},
							{
								type: "input",
								name: "email",
								message: "Email:",
							},
							{
								type: "input",
								name: "school",
								message: "School:",
							},
							{
								type: "input",
								name: "id",
								message: "ID:",
							},
						])
						.then(({ name, email, school, id }) => {
							teams.push(new Intern(name, id, email, school));

							buildTeam();
						});
				}

				if (choice.typeOfEmployee === "Done") {
					buildHtml();
				}
			});
	}
	console.log("Enter Manager Info");
	inquirer
		.prompt([
			{
				type: "input",
				name: "name",
				message: "Name:",
			},
			{
				type: "input",
				name: "email",
				message: "Email:",
			},
			{
				type: "input",
				name: "OfficeNumber",
				message: "Office number:",
			},
			{
				type: "input",
				name: "id",
				message: "ID:",
			},
		])
		.then((result) => {
			teams.push(
				new Manager(result.name, result.id, result.email, result.OfficeNumber)
			);

			buildTeam();
		});
}

main();
