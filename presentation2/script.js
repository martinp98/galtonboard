var Example = Example || {};

Example.galton = function() {
  var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composite = Matter.Composite,
    Composites = Matter.Composites,f
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies;

  var engine = Engine.create({
      enableSleeping: true
    }),
    world = engine.world;

  var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: window.innerWidth,
      height: window.innerHeight,
      wireframes: false
    }
  });

  Render.run(render);

  var runner = Runner.create();
  Runner.run(runner, engine);

  const size = 4.5;



  const pegs = [];
  const spacingY = 30;
  const spacingX = 35;
  var i, j, lastI;
  for (i = 0; i < 30; i++) {
    for (j = 1; j < i; j++) {
      pegs.push(
        Bodies.circle(
          1230 + (j * spacingX - i * (spacingX / 2)),
          i * spacingY,
          size,
          {
            isStatic: true,
            render: {
              fillStyle: "#FFFFFF",
              visible: true
            }
          }
        )
      );
    }
    lastI = i;
  }
  for (i = 0; i < 35; i++) {
    World.add(
      world,
      Bodies.rectangle(
        850 - spacingX + (j * spacingX - i * spacingX),
        lastI * spacingY + 195,
        size / 2,
        lastI + 250,
        {
          isStatic: true,
          render: {
            fillStyle: "#FFFFFF",
            visible: true
          },
          chamfer: {
            radius: [size * 1, size * 1, 0, 0]
          }
        }
      )
    );
  }
  World.add(
    world,
    Bodies.rectangle(1235, lastI * 1.33 * spacingY + 40, 1200, 5, {
      isStatic: true,
      render: {
        fillStyle: "#FFFFFF",
        visible: false
      }
    })
  );

    World.add(world, pegs);

    document.getElementById("startButton").onclick = function () 
{ 
  let total = document.getElementById("numberOfBalls").value;

  setInterval(() => {
    if (total-- > 0) {
      const circle = Bodies.circle(1230 + (Math.random()), 1, size, {
        density: 1,
        frictionAir: 0.05,
        sleepThreshold: 25,
        render: {
          visible: true
        }
      });

      Matter.Events.on(circle, "sleepStart", () => {
        Matter.Body.setStatic(circle, true);
      });
      World.add(world, circle);
    }
  }, 10);


};
    
  return {
    engine: engine,
    runner: runner,
    render: render,
    canvas: render.canvas,
    stop: function() {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
    }
  };
};

Example.galton();


