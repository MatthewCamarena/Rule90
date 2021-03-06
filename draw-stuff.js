// Draw stuff
// Time-stamp: <2019-01-21 20:08:33 Chuck Siska>
// ------------------------------------------------------------

// FUN. Draw filled rect.
function draw_rect( ctx, stroke, fill ) 
{
    stroke = stroke || 'lightgrey';
    fill = fill || 'dimgrey';
    ctx.save( );
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.lineWidth = 5;
    ctx.rect(75, 50, canvas.width - 150, canvas.height - 100);
    ctx.stroke();
    ctx.fill();
    ctx.restore( );
}

// =====================================================  draw_grid ====
function draw_grid( rctx, rminor, rmajor, rstroke, rfill  ) 
{
    rctx.save( );
    rctx.strokeStyle = rstroke;
    rctx.fillStyle = rfill;
    let width = rctx.canvas.width;
    let height = rctx.canvas.height;
    for ( var ix = 0; ix < width; ix += rminor )
    {
        rctx.beginPath( );
        rctx.moveTo( ix, 0 );
        rctx.lineTo( ix, height );
        rctx.lineWidth = ( ix % rmajor == 0 ) ? 0.5 : 0.25;
        rctx.stroke( );
        if ( ix % rmajor == 0 ) { rctx.fillText( ix, ix, 10 ); }
    }
    for ( var iy = 0; iy < height; iy += rminor )
    {
        rctx.beginPath( );
        rctx.moveTo( 0, iy );
        rctx.lineTo( width, iy );
        rctx.lineWidth = ( iy % rmajor == 0 ) ? 0.5 : 0.25;
        rctx.stroke( );
        if ( iy % rmajor == 0 ) {rctx.fillText( iy, 0, iy + 10 );}
    }
    rctx.restore( );
}




function rule90(rctx, size)
{	


	//color to fill box with
	rctx.fillStyle = "Red";

	//create a 2D array with respect to the grid filled with empty space
	let array = Array(rctx.canvas.width/10).fill().map(() => Array(rctx.canvas.height/10).fill(0));

	//assign this spot as 1 meaning it is filled with color
	array[0][20] = 1;
	rctx.fillRect(200,0,10,10);

	//array[0][0] = 1;
	//rctx.fillRect(0,0,10,10);

	//rctx.fillRect(190,10,10,10);

	// i and j will handle position starting at [0,0]
	var i = 0;
	var cSTATE = 0; // initial state will be 0 


	for(i;  i < size; i++)
	{ //for loop on rows

	var j = 0;

	//set initial state
	if(array[i][j]) 			// if 1
	{
		if(array[i][j+1])	    // if 11
		{	
			//edge case?
			array[i+1][j] = 1;
			rctx.fillRect((j)*10,(1+i)*10,10,10);

			if(array[i][j+2]) 	// if 111	#7 NO PAINT
			{
				cSTATE = 4;
			}
			else 				// else 110	#6
			{
				cSTATE = 3;
				array[i+1][j+1] = 1;
				rctx.fillRect((j+1)*10,(1+i)*10,10,10);
			} 
		}
		else 				    // else 10
		{
			if(array[i][j+2])   // if 101	#5 NO PAINT
			{
				cSTATE = 2;
			}
			else 				// else 100	#4
			{
				cSTATE = 1;
				array[i+1][j+1] = 1;
				rctx.fillRect((j+1)*10,(1+i)*10,10,10);
			} 			
		}

	}
	else					    // if 0
	{
		if(array[i][j+1]) 		// if 01
		{
			//edge case
			array[i+1][j] = 1;
			rctx.fillRect((j)*10,(1+i)*10,10,10);


			if(array[i][j+2])   // if 011	#3
			{
				array[i+1][j+1] = 1;
				rctx.fillRect((j+1)*10,(1+i)*10,10,10);
				cSTATE = 4;
			}
			else 				// else 010	#2 NO PAINT
			{
				cSTATE = 3;
			} 
		}
		else  					// else its 00
		{
			if(array[i][j+2])   // if 001	#1				middle will be filled
			{
				array[i+1][j+1] = 1;
				rctx.fillRect((j+1)*10,(1+i)*10,10,10);
				cSTATE = 2;
			}
			else 				// else 000	#0 NO PAINT
			{
				cSTATE = 1;
			} 
		}
	}

	// more efficient with states
	for( j = 1; j < 40; j++)
	{
		switch (cSTATE) { 
		  case 1:              // 00 
		    if(array[i][j+2])  //001
		    {
		    	array[i+1][j+1] = 1;
		    	rctx.fillRect((j+1)*10,(1+i)*10,10,10);
		    	cSTATE = 2;
		    }
		    else	          //000
		    {
		    	cSTATE = 1;
		    }
		    break;
		  case 2: 			  //01
		    if(array[i][j+2]) //011
		    {
		    	array[i+1][j+1] = 1;
		    	rctx.fillRect((j+1)*10,(1+i)*10,10,10);
		    	cSTATE = 4;
		    }
		    else			  //010
		    {
		    	cSTATE = 3;

		    }

		    break;
		  case 3:             //10
		    if(array[i][j+2]) //101
		    {

		    	cSTATE = 2;
		    }
		    else			  //100
		    {
		    	array[i+1][j+1] = 1;
		    	rctx.fillRect((j+1)*10,(1+i)*10,10,10);
		    	cSTATE = 1;

		    }		   
		    break;
		  case 4:             //11
		    if(array[i][j+2]) //111
		    {
		    	array[i+1][j+1] = 1;
		    	rctx.fillRect((j+1)*10,(1+i)*10,10,10);
		    	cSTATE = 4;
		    }
		    else			  //110
		    {
		    	array[i+1][j+1] = 1;
		    	rctx.fillRect((j+1)*10,(1+i)*10,10,10);
		    	cSTATE = 3;

		    }	
		    break;

		}

	}//forloopj




	}//for loop i

}


