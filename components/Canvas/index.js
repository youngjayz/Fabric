import React, { useEffect } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import styles from "./style.module.css";

const Canvas = () => {
  const { editor, onReady } = useFabricJSEditor();

  useEffect(() => {
    isGrid();
  });

  const isGrid = () => {
    const count = 1;
    const footCount = 0;
    const grid = 30;
    const width = 700;
    const measurementThickness = 60;
    const tickSize = 10;
    const tickSizeFoot = 40;

    editor?.canvas.sendToBack(
      new fabric.Rect({
        left: 0,
        top: 0,
        fill: "#ddd",
        selectable: false,
        width: measurementThickness,
        height: 1000,
      })
    );

    editor?.canvas.sendToBack(
      new fabric.Rect({
        left: 0,
        top: 0,
        fill: "#ddd",
        selectable: false,
        width: measurementThickness,
        height: 1000,
      })
    );

    editor?.canvas.sendToBack(
      new fabric.Rect({
        left: 0,
        top: 0,
        fill: "#ddd",
        width: 4000,
        selectable: false,
        height: measurementThickness,
        zIndex: -100,
      })
    );

    for (let i = 0; i < width / grid; i++) {
      let offset = i * grid,
        location1 = offset + measurementThickness,
        isFoot = (i + 1) % 12 === 0 && i !== 0;

      // vertical
      editor?.canvas.sendToBack(
        new fabric.Line([location1, measurementThickness, location1, width], {
          stroke: isFoot ? "#888" : "#ccc",
          selectable: false,
        })
      );

      // horizontal
      editor?.canvas.sendToBack(
        new fabric.Line([measurementThickness, location1, width, location1], {
          stroke: isFoot ? "#888" : "#ccc",
          selectable: false,
        })
      );

      // Ruler ------------

      // left
      editor?.canvas.sendToBack(
        new fabric.Line(
          [
            measurementThickness - tickSize,
            location1,
            measurementThickness,
            location1,
          ],
          {
            stroke: "#888",
            selectable: false,
          }
        )
      );

      editor?.canvas.add(
        new fabric.Text(count + '"', {
          left: measurementThickness - tickSize * 2 - 7,
          top: location1,
          fontSize: 12,
          fontFamily: "san-serif",
        })
      );

      if (isFoot) {
        footCount++;

        editor?.canvas.sendToBack(
          new fabric.Line(
            [
              measurementThickness - tickSizeFoot,
              location1,
              measurementThickness,
              location1,
            ],
            {
              stroke: "#222",
              selectable: false,
            }
          )
        );
        editor?.canvas.add(
          new fabric.Text(footCount + "'", {
            left: measurementThickness - tickSizeFoot - 7,
            top: location1 + 4,
            fontSize: 12,
            fontFamily: "san-serif",
          })
        );
      }

      // top
      editor?.canvas.sendToBack(
        new fabric.Line(
          [
            location1,
            measurementThickness - tickSize,
            location1,
            measurementThickness,
          ],
          {
            stroke: "#888",
            selectable: false,
          }
        )
      );

      editor?.canvas.add(
        new fabric.Text(count + '"', {
          left: location1,
          top: measurementThickness - tickSize * 2 - 4,
          fontSize: 12,
          fontFamily: "san-serif",
        })
      );

      if (isFoot) {
        editor?.canvas.sendToBack(
          new fabric.Line(
            [
              location1,
              measurementThickness - tickSizeFoot,
              location1,
              measurementThickness,
            ],
            {
              stroke: "#222",
              selectable: false,
            }
          )
        );

        editor?.canvas.sendToBack(
          new fabric.Text(footCount + "'", {
            left: location1 + 4,
            top: measurementThickness - tickSizeFoot - 7,
            fontSize: 12,
            fontFamily: "san-serif",
          })
        );
      }

      count++;
    }

    editor?.canvas.on("object:moving", (options) => {
      // Snap to grid
      options.target.set({
        left: Math.round(options.target.left / grid) * grid,
        top: Math.round(options.target.top / grid) * grid,
      });
    });
  };

  const handleImage = (e) => {
    var reader = new FileReader();
    reader.onload = function (event) {
      var imgObj = new Image();
      imgObj.src = event.target.result;
      imgObj.onload = function () {
        var image = new fabric.Image(imgObj);
        image.set({
          cornersize: 10,
        });
        editor?.canvas.centerObject(image);
        editor?.canvas.add(image);
        editor?.canvas.renderAll();
      };
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div>
      <div className={styles.wrapper}>
        {/* <canvas id="canvas" /> */}
        <FabricJSCanvas className={styles.canvas} onReady={onReady} />
      </div>
      <input type="file" onChange={handleImage} />
    </div>
  );
};

export default Canvas;
