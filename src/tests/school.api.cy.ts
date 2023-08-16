context("/api/schools/courses", () => {
  it("Get a list of courses", () => {
    cy.request("GET", "/api/schools/courses").then(res => {
      expect(res.status).to.eq(200);
      expect(res.body.results).length.to.be.greaterThan(0);
    })
  })
})
context("/api/schools/degrees", () => {
  it("Get a list of degrees", () => {
    cy.request("GET", "/api/schools/degrees").then(res => {
      expect(res.status).to.eq(200);
      expect(res.body.results).length.to.be.greaterThan(0);
    })
  })
})
context("/api/school/user_schools", () => {
  it("Create a relation between user and school", () => {
    cy.request("POST", "/api/school/user_schools", {
      course1Name: 'Computer science',
      course2Name: undefined,
      course3Name: undefined,
      description: 'Hello world!',
      from: undefined,
      graduated: true,
      publicityName: 'Public',
      schoolDegreeName: 'Bachelor of Information Technology',
      schoolName: 'University of Information and Technology - Vietnam University',
      to: undefined,
      undergraduate: true,
      userHandle: 'clk3rxpgw0001u7f02hzw3gib'
    }).then(res => {
      expect(res.status).to.eq(200);
      expect(res.body.results).to.be.true;
    })
  })
})
