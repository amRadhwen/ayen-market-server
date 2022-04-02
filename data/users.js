const bcrypt = require("bcryptjs");
module.exports.users = [
	{
		firstName: "AMRI",
	    lastName: "Radhwen",
	    username: "Radhwen"
	    tel: "26794992"
	    email: "radhwen@gmail.com"
	    password: bcrypt.hashSync("12345678", 10),
	    birthDate: "1996-11-03T00:00:00.000+00:00",
	    prov: "JENDOUBA",
	    addr: "Ain Draham",
	    zip: "8134",
	    role: "user",
	    isAdmin: false,
	    avatar: "/avatars/16381095136573276219027314.jpg"
	},
	{
		firstName: "admin",
	    lastName: "admin",
	    username: "admin"
	    tel: "12345678"
	    email: "admin@gmail.com"
	    password: bcrypt.hashSync("12345678", 10),
	    birthDate: "1996-11-03T00:00:00.000+00:00",
	    prov: "JENDOUBA",
	    addr: "Ain Draham",
	    zip: "8134",
	    role: "user",
	    isAdmin: true,
	    avatar: "/avatars/16381095136573276219027413.jpg"
	}
]