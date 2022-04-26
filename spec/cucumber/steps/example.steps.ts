import { binding, then, when } from 'cucumber-tsflow';
import { assert } from 'chai';
import fetch from 'cross-fetch';

@binding()
export class ScenarioSteps {

  public response1: any;
  public body: any;

  public response2: any;
  public body2: any;

  @when(/I give username and password/)
  public async loginWithCredentials() {
    await fetch('http://localhost:3000/loginaction', {
      headers: {
        "username": 'bob',
        "password": 'P@55w0rd',
        "Accept": 'application/json',
        "Content-Type": 'application/json'
      },
      method: "post"
    }).then((response) => {
      this.response1 = response;
      return response.json();
    }).then(response => {
      this.body = response;
    })
  }

  @then(/I should see Status 200/)
  public async checkResponse() {
    assert.equal(this.response1.status, 200);
    assert.equal(this.body.result, 'G7T0K3N');
  }

  @when(/I give 2 ints/)
  public async giveTwoInts(){
    await  fetch('http://localhost:3000/sumaction', {
      headers: { 'token': 'G7T0K3N' }
      ,method: "POST",
      body: JSON.stringify({
        first: 1,
        second: 2,
      })
    }).then((response) => {
      this.response2 = response;
      return response.json();
    }).then(response => {
      this.body2 = response;
    })
  }

  @then(/I should receive the sum/)
  public async receiveTheSum() {
    assert.equal(this.body2.result, 3);
  }


  @when(/I give 2 invalid ints/)
  public async giveTwoInvalidInts(){
    await  fetch('http://localhost:3000/sumaction', {
      headers: { 'token': 'G7T0K3N' }
      ,method: "POST",
      body: JSON.stringify({
        first: 'asd',
        second: 'asdasd',
      })
    }).then((response) => {
      this.response2 = response;
      return response.json();
    }).then(response => {
      this.body2 = response;
    })
  }
  @then(/I should receive null as result/)
  public async receiveTheInvalidSum() {
    assert.equal(this.body2.result, null);
  }
  @when(/I give username and invalid password/)
  public async loginWithInvalidCredentials() {
    await fetch('http://localhost:3000/loginaction', {
      headers: {
        "username": 'bob',
        "password": 'asdasd',
        "Accept": 'application/json',
        "Content-Type": 'application/json'
      },
      method: "post"
    }).then((response) => {
      this.response1 = response;
      return response.json();
    }).then(response => {
      this.body = response;
    })
  }
  @then(/I should see Status 401/)
  public async unauthorizedStatus() {
    assert.equal(this.response1.status, 401);

  }

}

