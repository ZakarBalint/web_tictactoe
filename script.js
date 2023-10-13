$(document).ready(function() {
    
    let gameType = $('input:radio[name="gameType"]:checked').val();
    
    $('input:radio[name="gameType"]').click(function(){ //a játékmód változásakor cseréli a változót
        gameType = this.value;
        $(".game").load(location.href+" .game>*","");
        
        resetGame();
    })

    $(".reset").click(function() { //reseteli táblázatot
        $(".game").load(location.href+" .game>*","");
        resetGame();
    })

    function resetGame() //reseteli a változókat
    {
        XComb = [];
        OComb = [];
        szMezokDB = 9;
        nextRound = "X";
        gameType = $('input:radio[name="gameType"]:checked').val();
        $(".nyer").text("");
        szMezok = [[0,0], [0,1], [0,2], [1,0], [1,1], [1,2], [2,0], [2,1], [2,2]];
        $("#nextRoundO").removeClass("highlight");
        $("#nextRoundX").addClass("highlight");
    }
        
    let XComb = []; //X játékos mezői
    let OComb = []; //O játékos mezői
    let szMezokDB = 9;

    let nextRound = "X"; //melyik játékos következik ha üres a program megál

    let szMezok = [[0,0], [0,1], [0,2], [1,0], [1,1], [1,2], [2,0], [2,1], [2,2]];

    const mezoIDk = 
    [
        ["0", "1", "2"],
        ["3", "4", "5"],
        ["6", "7", "8"]
    ];

    function botLepes()
    {
        let lepet = false;
        
        do
        {
            let random = Math.floor(Math.random() * szMezok.length);
            let randomMezo = szMezok[random];
            
            if($("#"+ mezoIDk[randomMezo[0]][randomMezo[1]]).hasClass("szMezo"))
            {
                $(".szMezo#" + mezoIDk[randomMezo[0]][randomMezo[1]]).text("O");
                $(".szMezo#" + mezoIDk[randomMezo[0]][randomMezo[1]]).addClass("fMezo");
                $(".szMezo#" + mezoIDk[randomMezo[0]][randomMezo[1]]).removeClass("szMezo");
                OComb.push($(".fMezo#" + mezoIDk[randomMezo[0]][randomMezo[1]]).attr('id'));

                szMezok.splice(random, 1);

                lepet = true;                
            }
            else
            {
                szMezok.splice(random, 1);
            }

        }while(!lepet);
    }


    $("table").on('click', ".szMezo", function(){ //szabad mezőre kattintottak  

        if(gameType == "egyszemelyes")
        {
            if(nextRound == "X" || nextRound == "O")
            {   
                disableClick = true;
                $(this).text("X");
                $(this).removeClass("szMezo");
                $(this).addClass("fMezo");
                XComb.push($(this).attr('id'));

                szMezokDB--;
                isThereWinner();

                if(nextRound == "O")
                {
                    setTimeout(() => {
                        botLepes()
                        szMezokDB--;
                        isThereWinner();
                    }, 300);                    
                }
            }
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

            szMezokDB--;
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
                        gameType = "";

                        $(".nyer").text("X nyert!");
                        return;
                    }                    
                }
            }

            nextRound = "O";
            $("#nextRoundX").removeClass("highlight");
            $("#nextRoundO").addClass("highlight");
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
                        gameType = "";

                        $(".nyer").text("O nyert!");
                        return;
                    }
                    
                }
            }

            nextRound = "X";
            $("#nextRoundO").removeClass("highlight");
            $("#nextRoundX").addClass("highlight");
        }

        if(szMezokDB == 0)
        {
            nextRound = "";
            gameType = "";
            $(".nyer").text("Döntetlen!");

            return;
        }
    }
    
})
