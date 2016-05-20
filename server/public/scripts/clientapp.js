$(document).ready(function () {

  // Load existing animals
  $.get('/animals', getAnimals);

  //------- EVENT LISTENERS -------//
  $('#submit').on('click', postAnimal);

});

function postAnimal(event) {
  event.preventDefault();

  var newAnimal = { animalName: $('#add-animal').children('input').val() };

  console.log('animal gen', newAnimal);
  $.post('/animals', newAnimal, postAnimalResponse);
  $('#add-animal').children('input').val('');
}

function postAnimalResponse(res) {
  if (res == 'Created') {
    $.get('/animals', getAnimals);
    console.log('Animal accepted!');
  } else {
    console.log('Pet rejected!!', res);
  }
}

function getAnimals(animals) {
  $('#existing-paddocks').empty();
  $('#existing-paddocks').append('<tr>' +
         '<th>' + 'Animal' + '</th>' +
         '<th>' + 'Population' + '</th>' +
         '</tr>');

  animals.forEach(function (row) {

    var $el = $('<tr>' +
         '<td>' + row.animal_name +  '</td>' +
         '<td>' + row.population +  '</td>' +
       '</tr>');
    $('#existing-paddocks').append($el);
  });
}
