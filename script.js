$(document).ready(function() {
    
    let game_type = "egyszemelyes";
    
    $("input[name=GameType][value=egyszemelyes]").attr('checked', 'checked');
    
    $('input:radio[name="gameType"]').click(function(){
        //console.log(this.value);
        game_type = this.value;
    })

    $(".reset").click(function() {
        location.reload();
    })
    

    

    let XComb = [];
    let OComb = [];

    let nextRound = "X";

    $("table").on('click', ".mezo", function(){        
            
        if(nextRound == "X")
        {
            $(this).text("X");
            $(this).removeClass("mezo");
            XComb.push($(this).attr('id'));
            //console.log(XComb);
        }
        else if(nextRound == "O")
        {
            $(this).text("O");
            $(this).removeClass("mezo");
            OComb.push($(this).attr('id'));
            //console.log(OComb);
        }
        //console.log(this);

        isThereWinner();
    })

    const winningComb = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
        ]

    function isThereWinner()
    {
        if(nextRound == "X")
        {
            for (const key in winningComb) {
                if (Object.hasOwnProperty.call(winningComb, key)) {
                    const element = winningComb[key];
                    
                    
                    if(XComb.indexOf(element[0]) != -1 && XComb.indexOf(element[1]) != -1 && XComb.indexOf(element[2]) != -1)
                    {
                        console.log("Nyert X");
                
                    }
                    
                }
            }

            nextRound = "O";
        }
        else if(nextRound == "O")
        {
            for (const key in winningComb) {
                if (Object.hasOwnProperty.call(winningComb, key)) {
                    const element = winningComb[key];
                    
                    if(OComb.indexOf(element[0]) != -1 && OComb.indexOf(element[1]) != -1 && OComb.indexOf(element[2]) != -1)
                    {
                        console.log("Nyert O");
                    }
                    
                }
            }

            nextRound = "X";
        }
    }

    /*
    if(game_type == "egyszemelyes")
    {

        $("td").click(function(){
            

            
        })

    }
    else
    {
        $("td").click(function(){
            

            
        })
    }
    */

    
})
