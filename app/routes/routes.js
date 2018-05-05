module.exports = function(app,db){
    const collection = 
    app.post('/notes', (req, res) => {
        const note = { text: req.body, title: req.body.title };
        db.collection('adam_sandbox').insert(note, (err,result) =>{
            if(err){
                res.send({'error' : 'An error has occurred'});
            }    
            else{
                res.send(result.ops[0]);
            }
        })
    });

    app.get('/draft/:id', (req, res) => {
        const id = req.params.id;
        console.log(id);
        if(typeof require !== 'undefined') XLSX = require('xlsx');
        var draftSpreadsheet = 'draft' + id + '.xlsx';
        var workbook = XLSX.readFile(draftSpreadsheet);
        var wb = XLSX.utils.sheet_to_json(workbook.Sheets.Sheet1);
        console.log(wb.length);
        
        
        res.send(wb)
    });

    app.get('/draft/:year/round/:round', (req, res) => {
        const year = req.params.year;
        const round = req.params.round;
        if(typeof require !== 'undefined') XLSX = require('xlsx');
        var draftSpreadsheet = 'draft' + year + '.xlsx';
        var workbook = XLSX.readFile(draftSpreadsheet);
        var wb = XLSX.utils.sheet_to_json(workbook.Sheets.Sheet1)
            .filter(p => p.round == round);
        
        res.send(wb);
    });

    app.get('/draft/:year/:drafter', (req, res) => {
        const year = req.params.year;
        const drafter = req.params.drafter;
        if(typeof require !== 'undefined') XLSX = require('xlsx');
        var draftSpreadsheet = 'draft' + year + '.xlsx';
        var workbook = XLSX.readFile(draftSpreadsheet);
        var wb = XLSX.utils.sheet_to_json(workbook.Sheets.Sheet1)
            .filter(p => p.Drafter == drafter);
        res.send(wb);
    })
};