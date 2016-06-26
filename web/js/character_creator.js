function character (character_name, level, class_name) {

	var stats = {
		'hp': 12,
		'atk': 4,
		'def': 4,
		'mp': 6,
		'skl': 1
	};

	//warrior
	var growths = {
		'hp': 1.3,
		'atk': 1.6,
		'def': 1.3,
		'mp': 1.1,
		'skl': 1
	};

	console.log(stats);

	function level_up() {
		stats.hp = stats.hp * growths.hp;
		stats.atk = stats.atk * growths.atk;
		stats.def = stats.def * growths.def;
		stats.mp = stats.mp * growths.mp;
		stats.skl = stats.skl + growths.skl;

		console.log(stats);
	}

	return level_up;
}

create_form = $('#new_character_form');
display = $('.character_display');

create_form.submit(
	character($('#new_character_form #new_character_name').val(), 
		1, 
		'warrior'));


