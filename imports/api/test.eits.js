import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'chai';
import { Eits } from '../api/eits';
 
if (Meteor.isServer) {
  describe('Eits', () => {
    describe('methods', () => {
        const userId = Random.id();
        let EitId;
        beforeEach(()=>{
            Eits.remove({});
            EitId = Eits.insert({
                name: 'Dayo',
                age: 31,
                phone: 16626278,
                country: 'Nigeria',
                area: 'Technology',
                fact: 'Party hype',
                createdAt: new Date(),
                owner: userId,
                username: "lawrence"
            }

            )
            Meteor.call('eits.insert' )

        });
        
      it('can delete owned task', () => {
                  // Find the internal implementation of the task method so we can
        // test it in isolation
        const deleteTask = Meteor.server.method_handlers['Eits.remove'];
 
        // Set up a fake method invocation that looks like what the method expects
        const invocation = { userId };
 
        // Run the method with `this` set to the fake invocation
        deleteTask.apply(invocation, [EitId]);
 
        // Verify that the method does what we expected
        assert.equal(Eits.find().count(), 0);
      });
    });
  });
}