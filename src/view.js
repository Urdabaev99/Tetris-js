export default class View {
   static colors = {
      '1': 'cyan',
      '2': 'blue',
      '3': 'orange',
      '4': 'yellow',
      '5': 'green',
      '6': 'purple',
      '7': 'red'
   }
   constructor(element, width, height, row, colums) {
      this.element = element;
      this.width = width;
      this.height = height;


      this.canvas = document.createElement('canvas');
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.context = this.canvas.getContext('2d');

      this.playfieldBorderWidth = 4;
      this.playfieldX = this.playfieldBorderWidth;
      this.playfieldY = this.playfieldBorderWidth;
      this.playfieldWidth = this.width * 2 / 3;
      this.playfieldHeight = this.height;
      this.playfieldInnerWidth = this.playfieldWidth - this.playfieldBorderWidth * 2;
      this.playfieldInnerHeight = this.playfieldHeight - this.playfieldBorderWidth * 2;


      this.blockWidth = this.playfieldInnerWidth / colums;
      this.blockHeight = this.playfieldInnerHeight / row;

      this.panelX = this.playfieldWidth + 10;
      this.panelY = 0;
      this.panelWidth = this.width / 3;
      this.panelHeight = this.height;


      this.element.appendChild(this.canvas);
   }

   renderMainScreen(state) {
      this.clearScreen();
      this.renderPlayfield(state);
      this.renderPanel(state);

   }




   renderStartScreen() {
      this.context.fillStyle = 'green';
      this.context.font = '18px "Press Start  2P"';
      this.context.textAlign = 'center';
      this.context.textBaseline = 'middle';
      this.context.fillText('Press ENTER to Start', this.width / 2, this.height / 2);
   }

   renderPauseScreen() {

      this.context.fillStyle = 'rgba(0,0,0,0.75)';
      this.context.fillRect(0, 0, 535, this.height);

      this.context.fillStyle = 'green';
      this.context.font = '24px "Press Start  2P"';
      this.context.textAlign = 'center';
      this.context.textBaseline = 'middle';
      this.context.fillText('Press P to Resume', this.width / 3, this.height / 2);
   }

   renderEndScreen({ score }) {

      this.clearScreen();

      this.context.fillStyle = 'green';
      this.context.font = '24px "Press Start 2P"';
      this.context.textAlign = 'center';
      this.context.textBaseline = 'middle';
      this.context.fillText('GAME OVER', this.width / 2, this.height / 2 - 48);
      this.context.fillText(`Score: ${score}`, this.width / 2, this.height / 2);
      this.context.fillText('Press ENTER to Restart', this.width / 2, this.height / 2 + 48);
   }

   clearScreen() {
      this.context.clearRect(0, 0, this.width, this.height);
   }
   renderPlayfield({ playfield }) {
      for (let y = 0; y < playfield.length; y++) {
         const line = playfield[y];

         for (let x = 0; x < line.length; x++) {
            const block = line[x];

            if (block) {
               this.renderBlock(
                  this.playfieldX + (x * this.blockWidth),
                  this.playfieldY + (y * this.blockHeight),
                  this.blockWidth,
                  this.blockHeight,
                  View.colors[block]
               );
            }
         }
      }

      this.context.strokeStyle = 'green';
      this.context.lineWidth = this.playfieldBorderWidth;
      this.context.strokeRect(0, 0, this.playfieldWidth, this.playfieldHeight);
   }

   renderPanel({ level, score, lines, nextPiece }) {

      this.context.textAlign = 'start';
      this.context.textBaseline = 'top';
      this.context.fillStyle = 'black';
      this.context.font = '18px "Press Start 2P"';



      this.context.fillText(`Score: ${score}`, this.panelX + 20, this.panelY + 10);
      this.context.fillText(`Lines: ${lines}`, this.panelX + 20, this.panelY + 50);
      this.context.fillText(`Level: ${level}`, this.panelX + 20, this.panelY + 90);
      this.context.fillText('Next:', this.panelX + 25, this.panelY + 130);
      this.context.fillText('CONTROLS:', this.panelX + 20, this.panelY + 270);
      this.context.fillText('↑: ROTATE', this.panelX + 20, this.panelY + 310);
      this.context.fillText('←: LEFT', this.panelX + 20, this.panelY + 350);
      this.context.fillText('→: RIGHT', this.panelX + 20, this.panelY + 390);
      this.context.fillText('↓: HARD-DOWN', this.panelX + 20, this.panelY + 430);
      this.context.fillText('P: PAUSE', this.panelX + 20, this.panelY + 470);
      this.context.fillText('CTRL+R: RES', this.panelX + 20, this.panelY + 510);


      for (let y = 0; y < nextPiece.blocks.length; y++) {
         for (let x = 0; x < nextPiece.blocks[y].length; x++) {
            const block = nextPiece.blocks[y][x];


            if (block) {
               this.renderBlock(
                  this.panelX + 40 + (x * this.blockWidth * 0.5),
                  this.panelY + 170 + (y * this.blockHeight * 0.5),
                  this.blockWidth * 0.5,
                  this.blockHeight * 0.5,
                  View.colors[block]

               );
            }

         }

      }


   }

   renderBlock(x, y, width, height, color) {

      this.context.fillStyle = color;
      this.context.strokeStyle = 'black';
      this.context.lineWidth = 2;


      this.context.fillRect(x, y, width, height);
      this.context.strokeRect(x, y, width, height);
   }
}