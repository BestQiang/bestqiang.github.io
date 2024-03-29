
(function() {
            
    //        获取id函数
    function my$(id) {
        return document.getElementById(id)
    };
			document.onclick=function(){
			my$("audio").play();
			}

            

    var supports3DTransforms = document.body.style['perspectiveProperty'] !== undefined ||
        document.body.style['WebkitPerspective'] !== undefined ||
        document.body.style['MozPerspective'] !== undefined ||
        document.body.style['msPerspective'] !== undefined ||
        document.body.style['OPerspective'] !== undefined;

    if (!supports3DTransforms) {
        alert('Your browser doesn\'t support CSS3 3D transforms :/');
    }

    function transform(element, value) {
        element.style.WebkitTransform = value;
        element.style.MozTransform = value;
        element.style.msTransform = value;
        element.style.OTransform = value;
        element.style.transform = value;
    }

    var width = 500,
        height = 600,
        quantity = 250,
		snow = 200,
        types = ['text', 'select', 'progress', 'meter', 'button', 'radio', 'checkbox'],
        greetings = ['ᵧₒᵤ❤', 'Dear 琳琳', 'See you tomorrow', 'Good luck', 'Merry Christmas', '(๑′ᴗ‵๑)Ｉ', '天天开心', '啊琦最棒', 'Lᵒᵛᵉ', 'See you tomorrow', 'Happy Holidays', 'Only if you asked', 'to see me', 'our meeting would', 'be meaningful', 'to me', '相遇', '想见'];

    var tree = document.querySelector('.tree'),
        treeRotation = 0;

    tree.style.width = width + 'px';
    tree.style.height = height + 'px';

    window.addEventListener('resize', resize, false);

    // The tree
    for (var i = 0; i < quantity; i++) {
        var element = null,
            type = types[Math.floor(Math.random() * types.length)],
            greeting = greetings[Math.floor(Math.random() * greetings.length)];

        var x = width / 2,
            y = Math.round(Math.random() * height);

        var rx = 0,
            ry = Math.random() * 360,
            rz = -Math.random() * 15;

        var elemenWidth = 5 + ((y / height) * width / 2),
            elemenHeight = 26;

        switch (type) {
			case 'button':
                element = document.createElement('button');
                element.textContent = greeting;
                element.style.width = elemenWidth + 'px';
                element.style.height = elemenHeight + 'px';
                break;
            case 'progress':
                element = document.createElement('progress');
                element.style.width = elemenWidth + 'px';
                element.style.height = elemenHeight + 'px';
                if (Math.random() > 0.5) {
                    element.setAttribute('max', '100');
                    element.setAttribute('value', Math.round(Math.random() * 100));
                }
                break;
            case 'select':
                element = document.createElement('select');
                element.setAttribute('selected', greeting);
                element.innerHTML = '<option>' + greetings.join('</option><option>') + '</option>';
                element.style.width = elemenWidth + 'px';
                element.style.height = elemenHeight + 'px';
                break;
            case 'meter':
                element = document.createElement('meter');
                element.setAttribute('min', '0');
                element.setAttribute('max', '100');
                element.setAttribute('value', Math.round(Math.random() * 100));
                element.style.width = elemenWidth + 'px';
                element.style.height = elemenHeight + 'px';
                break;
            case 'radio':
                element = document.createElement('input');
                element.setAttribute('type', 'radio');
                if (Math.random() > 0.5) element.setAttribute('checked', '');
                break;
            case 'checkbox':
                element = document.createElement('input');
                element.setAttribute('type', 'checkbox');
                if (Math.random() > 0.5) element.setAttribute('checked', '');
                break;
            case 'text':
            default:
                element = document.createElement('input');
                element.setAttribute('type', 'text');
                element.setAttribute('value', greeting);
                element.style.width = elemenWidth + 'px';
                element.style.height = elemenHeight + 'px';
        }

        transform(element, 'translate3d(' + x + 'px, ' + y + 'px, 0px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) rotateZ(' + rz + 'deg)');

        tree.appendChild(element);
    }

    // The snow
    for (var i = 0; i < snow; i++) {
        var element = document.createElement('img');
  			element.src='js/snowflake.png';
			
			element.style.width = '10px';
			element.style.height = '10px';

        var spread = width * 4;

        var x = Math.round(Math.random() * spread) - (spread / 4),
            y = Math.round(Math.random() * height),
            z = Math.round(Math.random() * spread) - (spread / 2);

        var rx = 0,
            ry = Math.random() * 360,
            rz = 0;


        transform(element, 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) rotateZ(' + rz + 'deg)');

        tree.appendChild(element);
    }

    function resize() {
        tree.style.top = ((window.innerHeight - height - 100) / 2) + 'px';
    }

    resize();

})()