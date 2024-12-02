const express = require('express');
const app = express();
const fs = require('node:fs');
// Set EJS as the view engine
app.set('view engine', 'ejs');

// Define the root route
app.get("/", (req, res) => {
    fs.readdir("uploads",{withFileTypes:true}, (err, file) => {
        if (err) {
            console.log(err);
        }
        res.render("index", { file });
    });
});

//create notes page
app.get('/new', (req, res) => {
    res.render('new');
});


app.get('/view/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = `./uploads/${filename}`;

    fs.readFile(filePath, 'utf8', (err, data) => {
        res.send(data);
    });
});

app.get('/delete/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = `./uploads/${filename}`;

    fs.unlink(filePath, (err) => {
        if (err) throw err;
        else {
            res.redirect('/');
        }
    });
});


app.get('/edit/:title', (req, res) => {
    const title = req.params.title
    fs.readFile(`./uploads/${title}`,'utf-8',(err,data)=>{
        res.render('edit',{
            title:title,
            description:data
        })
    })
});
app.get('/edit-note/:oldTitle', (req, res) => {
    const oldTitle = req.params.oldTitle;
    const title = req.query.title;
    const description = req.query.description;

    fs.rename(`./uploads/${oldTitle}`,`./uploads/${title}`,(err)=>{

        fs.writeFile(`./uploads/${title}`, description, (err) => {
            if (err) {
                console.error(err);
            } else {
                res.redirect('/');
            }
        });
    })
});





app.get('/notes', (req, res) => {
    fs.writeFile(`./uploads/${req.query.noteName}`,req.query.noteDescription,function(err){
        if(err) console.log(err);
        else res.redirect('/');
    });
});
// Start the server
app.listen(3000);



 

// front end par ek mini quiz application banana he, jisme hame 2 random number generate karna he aur usse user se puchna he aur lene ke baad check karna he ki user ne jo diya he wo sahi he ki nahi, agar sahi he then well 