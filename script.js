$(document).ready(function() {
    
    let gameType = "tobbszemelyes";
    
    $('input:radio[name="gameType"]').click(function(){ //a játékmód változásakor cseréli a változót
        gameType = this.value;
    })

    $(".reset").click(function() { //oldal újratöltése
        location.reload();
    })
        

    let XComb = []; //X játékos mezői
    let OComb = []; //O játékos mezői

    let nextRound = "X"; //melyik játékos következik ha üres a program megál

    $("table").on('click', ".mezo", function(){ //szabad mezőre kattintottak  
            
        if(nextRound == "X")
        {
            $(this).text("X");
            $(this).removeClass("mezo");
            XComb.push($(this).attr('id'));
        }
        else if(nextRound == "O")
        {
            $(this).text("O");
            $(this).removeClass("mezo");
            OComb.push($(this).attr('id'));
        }

        isThereWinner();
    })


    const winningComb = [ //nyerő kombinációk
        ["0", "1", "2"],
        ["3", "4", "5"],
        ["6", "7", "8"],
        ["0", "3", "6"],
        ["1", "4", "7"],
        ["2", "5", "8"],
        ["0", "4", "8"],
        ["2", "4", "6"]
        ]
    

    function isThereWinner() //nyertes keresése
    {
        if(nextRound == "X") //csak az előző kört vizsgálja
        {
            //végig megy a nyerő kombinációkon

            for (const key in winningComb) {
                if (Object.hasOwnProperty.call(winningComb, key)) {
                    const element = winningComb[key];

                    //megvizsgálja a 3 nyerő elemetet a játékosok mezőjéhez képest
                    if(XComb.includes(element[0]) && XComb.includes(element[1]) && XComb.includes(element[2]))
                    {
                        console.log("Nyert X");
                        nextRound = "";

                        $(".nyer").text("X nyert!");
                        return;
                    }
                    
                }
            }

            nextRound = "O";
        }
        else if(nextRound == "O") //csak az előző kört vizsgálja
        {
            //végig megy a nyerő kombinációkon
            for (const key in winningComb) {
                if (Object.hasOwnProperty.call(winningComb, key)) {
                    const element = winningComb[key];
                    
                    //megvizsgálja a 3 nyerő elemetet a játékosok mezőjéhez képest
                    if(OComb.includes(element[0]) && OComb.includes(element[1]) && OComb.includes(element[2]))
                    {
                        console.log("Nyert O");
                        nextRound = "";

                        $(".nyer").text("O nyert!");
                        return;
                    }
                    
                }
            }

            nextRound = "X";
        }
    }
    
})
