export default function (Alpine) {

  Alpine.directive('drag', (el, { value, modifiers, expression }, { evaluate, evaluateLater }) => {
    if (value === 'list') {

      //bind the data/magics to the element
      Alpine.bind(el, {
        'x-data'() {
          return {
            init() {

            },
            __isDragging: false,
          }
        },
        'x-on:dragstart'(event) {

          //if modifiers contains 'prevent', prevent the default behavior
          if (modifiers.includes('prevent')) {

          }

          this.__isDragging = true;
          // console.log('isDragging', this.__isDragging);

        },
        'x-on:dragend'(event) {

          //if modifiers contains 'prevent', prevent the default behavior
          if (modifiers.includes('prevent')) {
            // event.preventDefault();
          }

          this.__isDragging = false;
          // console.log('dragleave event', this.__isDragging);
        }
      });
    }

    if (value === 'list-item') {
      el.setAttribute('draggable', true);

      //create a unique id for the element
      let id = Math.random().toString(36).substr(2, 9);
      el.setAttribute('data-drag-id', id);

      el.addEventListener('dragstart', (event) => {

        //set item to the element's data-drag-id
        let dragId = el.getAttribute('data-drag-id');

        //if expression is set, set the item to the expression
        if (expression) {
          dragId = expression;
        }

        let effect = 'copy';

        if (modifiers.includes('move')) {
          effect = 'move';
        } else if (modifiers.includes('link')) {
          event = 'link';
        }

        //build the dataTransfer object
        const dataObject = {
          id: dragId,
          effect: effect,
        };

        let json = JSON.stringify(dataObject);

        // Store the serialized data as a JSON string
        event.dataTransfer.setData('application/json', json);

        event.dataTransfer.effectAllowed = effect;

      });
    }
  }).before('bind');

  Alpine.magic('list', el => {
    let $data = Alpine.$data(el)

    return {
      get isDragging() {
        console.log('isDragging', $data.__isDragging);
        return $data.__isDragging;
      },
    }
  });

  Alpine.directive('drop', (el, { value, expression }, { evaluate, evaluateLater }) => {
    if (value === 'target') {

      Alpine.bind(el, {
        'x-data'() {
          return {
            init() {
              // console.log('init drop');
            },
            __isEntered: false,
          }
        },
        'x-on:dragenter'(event) {
          this.__isEntered = true;
          // console.log('dragenter event', this.__isEntered);
        },
        'x-on:dragleave'(event) {
          this.__isEntered = false;
          // console.log('dragleave event', this.__isEntered);
        },
        'x-on:drop'(event) {

          this.__isEntered = false;

          event.preventDefault();
          event.stopPropagation();

          // Retrieve the data and parse it back into an object
          const jsonData = event.dataTransfer.getData('application/json');
          const data = JSON.parse(jsonData);

          // console.log('drop event', data);

          // let the handle match the effect
          let handle = handleCopy;

          if (data.effect === 'move') {
            handle = handleMove;
          }

          if (data.effect === 'link') {
            handle = handleLink;
          }

          if (expression) {
            // Pass the data object to the handler
            handle = generateDropHandler(expression, evaluateLater);
          }

          let item = '';

          // Call the handler with the deserialized data and the drop target
          handle(item, el, data);

        }
      });

      el.addEventListener('dragover', (event) => {
        event.preventDefault();
      });

    }
  }).before('bind');

  Alpine.magic('droparea', el => {
    let $data = Alpine.$data(el)

    return {
      get isEntered() {
        return $data.__isEntered;
      }
    }
  })

}

function generateDropHandler(expression, evaluateLater) {

  // No handler was passed to x-drop...
  if ([undefined, null, ''].includes(expression)) return () => {}

  let handle = evaluateLater(expression)

  return (item, target, data) => {
    // In the case of `x-drop:target="handle"`, let us call it manually...
    Alpine.dontAutoEvaluateFunctions(() => {
      handle(
          // item, target, data
          received => {
            if (typeof received === 'function') received(item, target, data);
          },
          { scope: {
              $item: item,
              $target: target,
              $data: data
            }},
      );
    });
  }
}

function handleMove(item, target, data) {
  item = document.querySelector(`[data-drag-id='${data['id']}']`);

  target.appendChild(item);

}

function handleCopy(item, target, data) {
  //get the data object from the scope object
  item = document.querySelector(`[data-drag-id='${data['id']}']`);

  console.log('item', item);

  let copy = item.cloneNode(true);
  copy.setAttribute('data-drag-id', Math.random().toString(36).substr(2, 9));

  target.appendChild(copy);

}

function handleLink(item, target, data) {
  console.log('link');

  //TODO
}
