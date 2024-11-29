use('squad-help-chat');

db.getCollection('messages').aggregate([
  {
    $match: {
      body: { $regex: 'паровоз', $options: 'i' },
    },
  },
  {
    $count: 'Загальна кількість',
  },
]);
