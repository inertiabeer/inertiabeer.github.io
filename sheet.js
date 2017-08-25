//sheet.setValue(row, column, value)
var data = [
    ['CNY'], 
    [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    ['cdeshiBBu', 'hmceshi']
];

function fillSheet(sheet, data) {
    // 请补充你的代码实现
    var row=data.length;
    var column=1;
    for(var i=0;i<data.length;i++)
    {
            column=column*data[i].length;
        
    }
    for(var this_row=0;this_row<row;this_row++)
        {
            for(var this_col=0;this_col<column;this_col++)
                {
                    var index=parseInt(this_col/data[this_row].length);
                    sheet.setValue(this_row, this_col, data[this_row][index]);
                }
        }

    
}