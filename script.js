$(document).ready(function() {
    
    let gameType = $('input:radio[name="gameType"]:checked').val();
    
    $('input:radio[name="gameType"]').click(function(){ //a játékmód változásakor cseréli a változót
        gameType = this.value;

        $(".game").load(location.href+" .game>*","");
        XComb = [];
        OComb = [];
        szMezok = 9;
        nextRound = "X";
    })

    $(".reset").click(function() { //reseteli a játék állását
        $(".game").load(location.href+" .game>*","");
        XComb = [];
        OComb = [];
        szMezok = 9;
        nextRound = "X";
        gameType = $('input:radio[name="gameType"]:checked').val();
    })
        

    let XComb = []; //X játékos mezői
    let OComb = []; //O játékos mezői
    let szMezok = 9;

    let nextRound = "X"; //melyik játékos következik ha üres a program megál

    $("table").on('click', ".szMezo", function(){ //szabad mezőre kattintottak  
        
        if(gameType == "egyszemelyes")
        {
            if(nextRound == "X")
            {
                $(this).text("X");
                $(this).removeClass("szMezo");
                $(this).addClass("fMezo");
                XComb.push($(this).attr('id'));
            }
            else if(nextRound == "O")
            {

            }

            szMezok--;
            isThereWinner();
        }
        else if(gameType == "ketszemelyes")
        {
            if(nextRound == "X")
            {
                $(this).text("X");
                $(this).removeClass("szMezo");
                $(this).addClass("fMezo");
                XComb.push($(this).attr('id'));
            }
            else if(nextRound == "O")
            {
                $(this).text("O");
                $(this).removeClass("szMezo");
                $(this).addClass("fMezo");
                OComb.push($(this).attr('id'));
            }


            szMezok--;
            isThereWinner();
        }
        
        
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
        if(nextRound == "X" && szMezok != 0) //csak az előző kört vizsgálja
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
                        gameType = "";

                        $(".nyer").text("X nyert!");
                        return;
                    }
                    
                }
            }

            nextRound = "O";
        }
        else if(nextRound == "O"  && szMezok != 0) //csak az előző kört vizsgálja
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
                        gameType = "";

                        $(".nyer").text("O nyert!");
                        return;
                    }
                    
                }
            }

            nextRound = "X";
        }
        else
        {
            nextRound = "";
            gameType = "";
            $(".nyer").text("Döntetlen!");

            return;
        }
    }
    
})
