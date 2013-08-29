$(document).ready(function() {
  // Hide if the toolbar is clicked from anywhere outside of the links container.
	$('#li3-perf-toolbar').click(function(e) {
    if ($(e.target).closest('#li3-perf-toolbar-links').length > 0 ||
      $(e.target).closest('#li3-perf-content').length > 0
    ) {
      return false;
    }

    toolbarCollapse();
  });

	// Show
  $('#li3-perf-toolbar-links a.li3-perf-link').click(function(e) {
    var oToolbar = $('#li3-perf-toolbar');

    if (typeof oToolbar.data('visible') !== 'undefined' &&
      oToolbar.data('visible') === this.id
    ) {
      toolbarCollapse();
      return false;
    }

		toolbarExpand(e.currentTarget.id);

    var mappings = {
      'lp-queries': '#li3-perf-queries',
      'lp-perf-graph': '#li3-perf-graph',
      'lp-timing': '#li3-perf-timing',
      'lp-variables': '#li3-perf-vars',
      'lp-log': '#li3-perf-log'
    };

		$('#li3-perf-content div').hide();

    $(mappings[this.id] + ', ' + mappings[this.id] + ' div').show();

    if (this.id === 'lp-log') {
      $.get('/li3_perf/tail', function(data) {
        $('#error-log').html(data);
      });
    }
	});

	$.get('/li3_perf/tail', function(data){
		$('#error-log').html(data);
	});

});

function toolbarExpand(elemId) {
	$('#li3-perf-toolbar').css({
		'overflow': 'auto'
	}).animate({
		height: '100%'
	}).data('visible', elemId);
}

function toolbarCollapse() {
	$('#li3-perf-toolbar').css({
		'overflow': 'hidden'
	}).animate({
		height: '24px'
  }).data('visible', false);
}